import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { AddToCartIconBtn } from '@/components/AddToCartButton';

export default async function HomePage() {
  // Fetch some featured medicines
  const featuredMedicines = await prisma.medicine.findMany({
    take: 4,
    include: { category: true },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-green-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Your Health, <br className="hidden lg:block"/>
                <span className="text-green-600">Delivered Safely</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Order your essential medicines, vitamins, and healthcare products online with fast, secure delivery right to your door.
              </p>
              <div className="flex gap-4">
                <Link href="/medicines" className="px-8 py-3.5 bg-green-500 text-white rounded-full font-semibold shadow-lg hover:bg-green-600 hover:shadow-xl transition flex items-center gap-2">
                  Shop Now <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-30"></div>
              <img 
                src="https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=800&auto=format&fit=crop" 
                alt="Pharmacy storefront" 
                className="relative rounded-2xl shadow-2xl object-cover h-96 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Row */}
      <div className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">Genuine Products</h3>
              <p className="text-sm text-gray-500 mt-2">100% authentic medicines from verified suppliers.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Truck size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
              <p className="text-sm text-gray-500 mt-2">Get your essentials delivered within 24 hours.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-500 mt-2">Our pharmacists are always available to help.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/medicines?category=${cat.id}`} className="bg-gray-50 hover:bg-green-50 border border-gray-100 rounded-xl p-6 text-center transition group">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/medicines" className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1 transition">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMedicines.map((med) => (
              <Link key={med.id} href={`/medicines/${med.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={med.imageUrl} 
                    alt={med.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                    {med.category.name}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-3 text-lg">{med.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{med.description}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${med.price.toFixed(2)}</span>
                    <AddToCartIconBtn medicine={med} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
