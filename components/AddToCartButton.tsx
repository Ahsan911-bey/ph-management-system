'use client';

import { useCart } from '@/components/CartProvider';
import { ShoppingCart } from 'lucide-react';
import React from 'react';

export function AddToCartButton({ 
  medicine, 
  large = false 
}: { 
  medicine: { id: number, name: string, price: number, imageUrl: string, stock: number },
  large?: boolean
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      imageUrl: medicine.imageUrl,
      maxStock: medicine.stock
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (large) {
    return (
      <button 
        onClick={handleAdd}
        disabled={medicine.stock <= 0}
        className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${added ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'}`}
      >
        <ShoppingCart size={24} />
        {added ? 'Added to Cart!' : 'Add to Cart'}
      </button>
    );
  }

  return (
    <button 
      onClick={handleAdd}
      disabled={medicine.stock <= 0}
      className={`px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${added ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'}`}
    >
      {added ? 'Added!' : 'Add'}
    </button>
  );
}

export function AddToCartIconBtn({
  medicine
}: { 
  medicine: { id: number, name: string, price: number, imageUrl: string, stock: number }
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (medicine.stock <= 0) return;
    
    addToCart({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      imageUrl: medicine.imageUrl,
      maxStock: medicine.stock
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      disabled={medicine.stock <= 0}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed ${added ? 'bg-green-500 text-white' : 'bg-green-50 text-green-600 hover:bg-green-500 hover:text-white'}`}
    >
      {added ? <ShoppingCart size={16} /> : '+'}
    </button>
  );
}
