import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AddToCartButton } from '@/components/AddToCartButton';

export default async function MedicineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const medicineId = parseInt(id);

  if (isNaN(medicineId)) {
    notFound();
  }

  const medicine = await prisma.medicine.findUnique({
    where: { id: medicineId },
    include: { category: true },
  });

  if (!medicine) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/medicines" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 font-medium mb-8 transition">
          <ArrowLeft size={20} /> Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Column */}
            <div className="h-96 md:h-auto bg-gray-100 relative">
              <img 
                src={medicine.imageUrl} 
                alt={medicine.name}
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>

            {/* Content Column */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="mb-4">
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                  {medicine.category.name}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{medicine.name}</h1>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <span className="text-4xl font-bold text-gray-900">${medicine.price.toFixed(2)}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${medicine.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {medicine.stock > 0 ? `${medicine.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <div className="mb-8 text-gray-600 leading-relaxed">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Description</h3>
                <p>{medicine.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <ShieldCheck size={18} className="text-green-500"/>
                  <span>Verified authentic product</span>
                </div>
              </div>

              <div className="flex gap-4">
                <AddToCartButton medicine={medicine} large />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
