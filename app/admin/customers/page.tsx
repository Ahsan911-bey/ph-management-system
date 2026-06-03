import prisma from '@/lib/prisma';
import { Eye } from 'lucide-react';
import Link from 'next/link';

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      sales: true,
    },
    orderBy: { id: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Phone</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Total Orders</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Total Spent</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map(customer => {
              const totalSpent = customer.sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
              
              return (
                <tr key={customer.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-500">#{customer.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 text-gray-600">{customer.phone}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                      {customer.sales.length} orders
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">
                    ${totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/customers/${customer.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition inline-flex items-center gap-1">
                      <Eye size={18} /> View
                    </Link>
                  </td>
                </tr>
              );
            })}
            {customers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
