'use client';

import React, { useActionState, useEffect } from 'react';
import { useCart } from '@/components/CartProvider';
import { createOrderAction } from '@/app/actions/order';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

type State = { error: string; success: boolean; orderId: number | null };
const initialState: State = { error: '', success: false, orderId: null };

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [state, formAction, isPending] = useActionState(
    async (prevState: State, formData: FormData): Promise<State> => {
      const result = await createOrderAction(formData);
      return { 
        error: result.error || '', 
        success: result.success || false, 
        orderId: result.orderId || null 
      };
    },
    initialState
  );

  useEffect(() => {
    if (state?.success) {
      clearCart();
    }
  }, [state?.success, clearCart]);

  if (state?.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-500 mb-8">Thank you for your purchase. Your order #{state.orderId} has been placed successfully.</p>
          <Link href="/medicines" className="block w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p>Your cart is empty.</p>
        <Link href="/medicines" className="text-green-600 underline mt-2">Go back</Link>
      </div>
    );
  }

  const cartPayload = JSON.stringify(items.map(i => ({ id: i.id, quantity: i.quantity })));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
        
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          
          {state?.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg font-medium">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-6">
            <input type="hidden" name="cartData" value={cartPayload} />
            
            <h2 className="text-xl font-bold text-gray-900">Billing Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" 
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="text" 
                  name="phone" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" 
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Total</h2>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">{items.length} items</span>
                <span className="text-2xl font-black text-green-600">${cartTotal.toFixed(2)}</span>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? 'Processing...' : 'Place Order'} <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
