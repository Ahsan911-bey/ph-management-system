'use client';

import { useActionState, Suspense } from 'react';
import { loginAction } from '@/app/actions/auth';
import Link from 'next/link';
import { HeartPulse } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const initialState = { error: '' };

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '';

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await loginAction(formData);
      return result || prevState;
    },
    initialState
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Link href="/" className="flex items-center gap-2 mb-8 text-green-600">
        <HeartPulse size={32} />
        <span className="text-2xl font-bold text-gray-900">MediStore</span>
      </Link>
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">Sign in to your account</p>
        
        {state?.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              name="username"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              name="password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition disabled:opacity-70 disabled:cursor-not-allowed font-medium"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href={`/register${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`} className="text-green-600 hover:underline font-medium">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
