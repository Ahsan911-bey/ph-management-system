'use server';

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { setSession, clearSession } from '@/lib/auth';

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  // Very basic query (no hashing as per requirements)
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || user.password !== password) {
    return { error: 'Invalid username or password' };
  }

  // Set session
  await setSession({
    userId: user.id,
    role: user.role,
  });

  // Redirect based on role
  if (user.role === 'ADMIN') {
    redirect('/admin/dashboard');
  } else {
    redirect('/');
  }
}

export async function registerAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  // Check if exists
  const existing = await prisma.user.findUnique({
    where: { username },
  });

  if (existing) {
    return { error: 'Username already taken' };
  }

  // Create user with default role USER
  const user = await prisma.user.create({
    data: {
      username,
      password,
      role: 'USER',
    },
  });

  await setSession({
    userId: user.id,
    role: user.role,
  });

  redirect('/');
}

export async function logoutAction() {
  await clearSession();
  redirect('/login');
}
