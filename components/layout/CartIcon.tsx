'use client';

import React from 'react';

import { useCart } from '@/components/CartProvider';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export function CartIcon() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" className="relative text-gray-600 hover:text-green-600 transition">
      <ShoppingCart size={24} />
      {mounted && cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
