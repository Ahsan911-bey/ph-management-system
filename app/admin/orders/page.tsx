import prisma from '@/lib/prisma';
import { Eye } from 'lucide-react';

export default async function AdminOrdersPage() {
  const sales = await prisma.sale.findMany({
    include: {
      customer: true,
      items: { include: { medicine: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {sales.length === 0 ? (
           <div className="p-12 text-center text-gray-500">No orders found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Customer</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Total</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sales.map(sale => (
                <tr key={sale.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #ORD-{sale.id.toString().padStart(4, '0')}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {sale.customer.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">
                    ${sale.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition flex items-center gap-1 inline-flex">
                      <Eye size={18} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
