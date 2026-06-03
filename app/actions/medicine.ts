'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function createMedicineAction(formData: FormData) {
  const session = await getSession();
  if (session?.role !== 'ADMIN') throw new Error('Unauthorized');

  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);
    const categoryId = parseInt(formData.get('categoryId') as string);
    const imageUrl = formData.get('imageUrl') as string;

    if (!name || !price || !categoryId || !imageUrl) {
      throw new Error('Missing required fields');
    }

    if (price < 0) throw new Error('Price cannot be negative');
    if (stock < 0) throw new Error('Stock cannot be negative');

    await prisma.medicine.create({
      data: {
        name,
        description,
        price,
        stock,
        imageUrl,
        categoryId,
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // Default to 1 year from now
      }
    });

  } catch (e: any) {
    console.error(e);
  }
  
  revalidatePath('/admin/medicines');
  revalidatePath('/medicines');
  revalidatePath('/');
  redirect('/admin/medicines');
}

export async function updateMedicineAction(id: number, formData: FormData) {
  const session = await getSession();
  if (session?.role !== 'ADMIN') throw new Error('Unauthorized');

  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);
    const categoryId = parseInt(formData.get('categoryId') as string);
    const imageUrl = formData.get('imageUrl') as string;

    if (price < 0) throw new Error('Price cannot be negative');
    if (stock < 0) throw new Error('Stock cannot be negative');

    await prisma.medicine.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        imageUrl,
        categoryId,
      }
    });

  } catch (e: any) {
    console.error(e);
  }
  
  revalidatePath('/admin/medicines');
  revalidatePath('/medicines');
  revalidatePath('/');
  redirect('/admin/medicines');
}

export async function deleteMedicineAction(formData: FormData) {
  const session = await getSession();
  if (session?.role !== 'ADMIN') return { error: 'Unauthorized' };

  const id = parseInt(formData.get('id') as string);

  try {
    // Check if it's in any sales
    const count = await prisma.saleItem.count({ where: { medicineId: id } });
    if (count > 0) {
      return { error: `Cannot delete. This medicine is included in ${count} orders.` };
    }

    await prisma.medicine.delete({ where: { id } });
  } catch (e: any) {
    return { error: e.message || 'Failed to delete medicine' };
  }
  revalidatePath('/admin/medicines');
  revalidatePath('/medicines');
  revalidatePath('/');
}
