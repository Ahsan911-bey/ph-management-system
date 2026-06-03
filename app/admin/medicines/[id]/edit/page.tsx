import prisma from '@/lib/prisma';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { updateMedicineAction } from '@/app/actions/medicine';
import { notFound } from 'next/navigation';

export default async function EditMedicinePage({
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
    where: { id: medicineId }
  });

  if (!medicine) {
    notFound();
  }

  const categories = await prisma.category.findMany();
  const updateActionWithId = updateMedicineAction.bind(null, medicineId);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/medicines" className="text-gray-500 hover:text-gray-900 transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Medicine</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form action={updateActionWithId} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
              <input type="text" name="name" defaultValue={medicine.name} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select name="categoryId" defaultValue={medicine.categoryId} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white">
                <option value="">Select a category...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input type="number" step="0.01" min="0" name="price" defaultValue={medicine.price} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
              <input type="number" min="0" name="stock" defaultValue={medicine.stock} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input type="url" name="imageUrl" defaultValue={medicine.imageUrl} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea name="description" defaultValue={medicine.description || ''} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="submit" className="bg-green-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-600 transition flex items-center gap-2">
              <Save size={18} /> Update Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
