import prisma from '@/lib/prisma';
import { Trash2, Plus } from 'lucide-react';
import { createCategoryAction, deleteCategoryAction } from '@/app/actions/category';

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { medicines: true }
      }
    },
    orderBy: { id: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Create Form */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Add New Category</h2>
            <form action={createCategoryAction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" 
                  placeholder="e.g., Supplements"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 font-medium"
              >
                <Plus size={18} /> Add Category
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Medicines</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map(cat => (
                  <tr key={cat.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-500">#{cat.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                        {cat._count.medicines} items
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form action={deleteCategoryAction} className="inline-block">
                        <input type="hidden" name="id" value={cat.id} />
                        <button 
                          type="submit" 
                          disabled={cat._count.medicines > 0}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition disabled:opacity-30 disabled:cursor-not-allowed"
                          title={cat._count.medicines > 0 ? "Cannot delete category with medicines" : "Delete category"}
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
