'use server';

import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

interface OrderItemPayload {
  id: number;
  quantity: number;
}

export async function createOrderAction(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: 'You must be logged in to place an order.' };
  }

  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const cartDataStr = formData.get('cartData') as string;

  if (!name || !phone || !cartDataStr) {
    return { error: 'Please provide all required fields.' };
  }

  let cartItems: OrderItemPayload[] = [];
  try {
    cartItems = JSON.parse(cartDataStr);
  } catch (e) {
    return { error: 'Invalid cart data.' };
  }

  if (cartItems.length === 0) {
    return { error: 'Cart is empty.' };
  }

  try {
    // Start Prisma Transaction
    const orderResult = await prisma.$transaction(async (tx) => {
      // 1. Fetch current medicines to verify stock and price
      const itemIds = cartItems.map(item => item.id);
      const medicines = await tx.medicine.findMany({
        where: { id: { in: itemIds } }
      });

      if (medicines.length !== cartItems.length) {
        throw new Error('Some items in your cart are no longer available.');
      }

      let totalAmount = 0;
      const saleItemsData = [];

      // 2. Validate stock and prepare sale items
      for (const cartItem of cartItems) {
        const medicine = medicines.find(m => m.id === cartItem.id)!;
        
        if (medicine.stock < cartItem.quantity) {
          throw new Error(`Insufficient stock for ${medicine.name}. Only ${medicine.stock} left.`);
        }

        totalAmount += medicine.price * cartItem.quantity;

        saleItemsData.push({
          medicineId: medicine.id,
          quantity: cartItem.quantity,
          priceAtSale: medicine.price,
        });

        // 3. Decrement stock
        await tx.medicine.update({
          where: { id: medicine.id },
          data: { stock: { decrement: cartItem.quantity } }
        });
      }

      // 4. Find or create Customer
      let customer = await tx.customer.findUnique({
        where: { phone }
      });

      if (!customer) {
        // Find if the current user already has a customer profile
        const userWithCustomer = await tx.user.findUnique({
          where: { id: session.userId },
          include: { customer: true }
        });

        if (userWithCustomer?.customer) {
          // Update existing customer profile
          customer = await tx.customer.update({
            where: { id: userWithCustomer.customer.id },
            data: { name, phone }
          });
        } else {
          // Create new customer and link to User
          customer = await tx.customer.create({
            data: {
              name,
              phone,
              userId: session.userId
            }
          });
        }
      } else {
        // If customer exists but belongs to no one, we could link it, but for safety just use it.
        // If it belongs to someone else, this might be an issue, but we'll allow sharing phone for now.
        customer = await tx.customer.update({
          where: { id: customer.id },
          data: { name } // update name just in case
        });
      }

      // 5. Create Sale
      const sale = await tx.sale.create({
        data: {
          customerId: customer.id,
          totalAmount,
          items: {
            create: saleItemsData
          }
        }
      });

      return sale;
    });

    return { success: true, orderId: orderResult.id };

  } catch (error: any) {
    return { error: error.message || 'An error occurred while placing the order.' };
  }
}

export async function deleteOrderAction(formData: FormData) {
  const session = await getSession();
  if (session?.role !== 'ADMIN') throw new Error('Unauthorized');

  const id = parseInt(formData.get('id') as string);
  
  try {
    // Due to onDelete: Cascade in Prisma, deleting the Sale also deletes SaleItem records.
    await prisma.sale.delete({ where: { id } });
  } catch (e: any) {
    console.error(e);
  }
  
  revalidatePath('/admin/orders');
  revalidatePath('/admin/customers');
  revalidatePath('/admin/dashboard');
  redirect('/admin/orders');
}
