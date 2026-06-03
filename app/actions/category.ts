'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';

export async function createCategoryAction(formData: FormData) {
  const session = await getSession();
  if (session?.role !== 'ADMIN') throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  if (!name) throw new Error('Category name is required');

  try {
    await prisma.category.create({ data: { name } });
  } catch (e: any) {
    console.error(e);
  }
  revalidatePath('/admin/categories');
}

export async function deleteCategoryAction(formData: FormData) {
  const session = await getSession();
  if (session?.role !== 'ADMIN') throw new Error('Unauthorized');

  const id = parseInt(formData.get('id') as string);
  
  try {
    // Check if category has medicines
    const count = await prisma.medicine.count({ where: { categoryId: id } });
    if (count > 0) {
      throw new Error(`Cannot delete category. It has ${count} medicines attached.`);
    }

    await prisma.category.delete({ where: { id } });
  } catch (e) {
    console.error(e);
  }
  revalidatePath('/admin/categories');
}
