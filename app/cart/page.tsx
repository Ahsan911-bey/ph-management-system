'use client';

import { useCart } from '@/components/CartProvider';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={32} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any medicines to your cart yet.</p>
          <Link href="/medicines" className="block w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">Items ({items.length})</h2>
                  <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Clear Cart
                  </button>
                </div>

                <ul className="space-y-6">
                  {items.map(item => (
                    <li key={item.id} className="flex flex-col sm:flex-row gap-6 items-center">
                      <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-green-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-500 hover:bg-gray-50 rounded-l-lg transition"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-medium text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                            className="p-2 text-gray-500 hover:bg-gray-50 rounded-r-lg transition disabled:opacity-30"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="w-20 text-right font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition ml-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-green-600">${cartTotal.toFixed(2)}</span>
              </div>
              
              <Link 
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition shadow-lg hover:shadow-xl"
              >
                Checkout <ArrowRight size={20} />
              </Link>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Taxes are calculated during checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ensure ShoppingCart is imported for empty state
import { ShoppingCart } from 'lucide-react';
