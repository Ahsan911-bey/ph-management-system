'use client';

import { useActionState } from 'react';
import { registerAction } from '@/app/actions/auth';
import Link from 'next/link';
import { HeartPulse } from 'lucide-react';

const initialState = { error: '' };

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await registerAction(formData);
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
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">Join MediStore today</p>
        
        {state?.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              name="username"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              name="password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed font-medium"
          >
            {isPending ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
