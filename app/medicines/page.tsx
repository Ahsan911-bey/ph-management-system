import prisma from '@/lib/prisma';
import Link from 'next/link';
import { AddToCartButton } from '@/components/AddToCartButton';

export default async function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categoryId = category ? parseInt(category) : undefined;

  const medicines = await prisma.medicine.findMany({
    where: categoryId ? { categoryId } : undefined,
    include: { category: true },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/medicines" 
                    className={`block py-1.5 px-3 rounded-lg text-sm transition ${!categoryId ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    All Medicines
                  </Link>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link 
                      href={`/medicines?category=${cat.id}`} 
                      className={`block py-1.5 px-3 rounded-lg text-sm transition ${categoryId === cat.id ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {categoryId ? categories.find(c => c.id === categoryId)?.name : 'All Products'}
              </h1>
              <span className="text-gray-500 text-sm">{medicines.length} items</span>
            </div>

            {medicines.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-gray-100 text-center">
                <p className="text-gray-500">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {medicines.map((med) => (
                  <Link key={med.id} href={`/medicines/${med.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group flex flex-col">
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img 
                        src={med.imageUrl} 
                        alt={med.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded inline-block w-fit">
                        {med.category.name}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-3 text-lg">{med.name}</h3>
                      <p className="text-gray-500 text-sm mt-1 flex-1 line-clamp-2">{med.description}</p>
                      
                      <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
                        <div>
                          <span className="text-xl font-bold text-gray-900">${med.price.toFixed(2)}</span>
                          {med.stock > 0 ? (
                            <p className="text-xs text-green-600 mt-0.5">In stock</p>
                          ) : (
                            <p className="text-xs text-red-600 mt-0.5">Out of stock</p>
                          )}
                        </div>
                        <AddToCartButton medicine={med} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
