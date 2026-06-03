import prisma from '@/lib/prisma';
import { Edit, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { DeleteMedicineButton } from '@/components/DeleteMedicineButton';

export default async function AdminMedicinesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string, category?: string }>;
}) {
  const { search, category } = await searchParams;
  const categoryId = category ? parseInt(category) : undefined;

  const whereClause: any = {};
  if (search) {
    whereClause.name = { contains: search };
  }
  if (categoryId) {
    whereClause.categoryId = categoryId;
  }

  const medicines = await prisma.medicine.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: { id: 'desc' }
  });

  const categories = await prisma.category.findMany();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medicines Inventory</h1>
        <Link href="/admin/medicines/new" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2 font-medium">
          <Plus size={18} /> Add Medicine
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
        <form className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <input 
              type="text" 
              name="search"
              defaultValue={search}
              placeholder="Search medicines..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select 
            name="category"
            defaultValue={category}
            className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button type="submit" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
            Filter
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {medicines.map(med => (
              <tr key={med.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                      <img src={med.imageUrl} alt={med.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{med.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{med.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                    {med.category.name}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  ${med.price.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${med.stock > 10 ? 'text-green-600' : med.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {med.stock} units
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/medicines/${med.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                      <Edit size={18} />
                    </Link>
                    <DeleteMedicineButton id={med.id} />
                  </div>
                </td>
              </tr>
            ))}
            {medicines.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
