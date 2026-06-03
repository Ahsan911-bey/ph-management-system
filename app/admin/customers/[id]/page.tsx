import prisma from '@/lib/prisma';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customerId = parseInt(id);

  if (isNaN(customerId)) notFound();

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      sales: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!customer) notFound();

  const totalSpent = customer.sales.reduce((acc, sale) => acc + sale.totalAmount, 0);

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/customers" className="text-gray-500 hover:text-gray-900 transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-1">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{customer.name}</h2>
          <p className="text-gray-500 mt-1">{customer.phone}</p>
          
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="font-bold text-gray-900 text-lg">{customer.sales.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lifetime Spent</p>
              <p className="font-bold text-green-600 text-lg">${totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 md:col-span-2 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Order History</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customer.sales.map(sale => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 font-medium text-blue-600">
                    <Link href={`/admin/orders/${sale.id}`}>
                      #ORD-{sale.id.toString().padStart(4, '0')}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ${sale.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
              {customer.sales.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No orders placed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
