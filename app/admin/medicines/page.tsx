import prisma from '@/lib/prisma';
import { Edit, Trash2, Plus } from 'lucide-react';

export default async function AdminMedicinesPage() {
  const medicines = await prisma.medicine.findMany({
    include: { category: true },
    orderBy: { id: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medicines Inventory</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2 font-medium">
          <Plus size={18} /> Add Medicine
        </button>
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
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
