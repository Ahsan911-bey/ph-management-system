import prisma from '@/lib/prisma';
import { ArrowLeft, User, Calendar, DollarSign, Package } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CompleteOrderButton } from '@/components/CompleteOrderButton';

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = parseInt(id);

  if (isNaN(orderId)) notFound();

  const sale = await prisma.sale.findUnique({
    where: { id: orderId },
    include: {
      customer: true,
      items: {
        include: { medicine: true }
      }
    }
  });

  if (!sale) notFound();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="text-gray-500 hover:text-gray-900 transition">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Order #ORD-{sale.id.toString().padStart(4, '0')}
          </h1>
        </div>
        <div>
          <CompleteOrderButton id={sale.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Customer Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={20} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Customer</h3>
            <p className="font-bold text-gray-900 mt-1">{sale.customer.name}</p>
            <p className="text-sm text-gray-600">{sale.customer.phone}</p>
          </div>
        </div>

        {/* Date Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Calendar size={20} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
            <p className="font-bold text-gray-900 mt-1">
              {new Date(sale.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              {new Date(sale.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Total Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <DollarSign size={20} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
            <p className="font-bold text-green-600 mt-1 text-xl">
              ${sale.totalAmount.toFixed(2)}
            </p>
            <span className="inline-block mt-1 px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
              Paid
            </span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <Package size={20} className="text-gray-500" />
          <h3 className="font-bold text-gray-900">Ordered Items</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Product</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Price at Sale</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Quantity</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sale.items.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                      <img src={item.medicine.imageUrl} alt={item.medicine.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-medium text-gray-900">{item.medicine.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  ${item.priceAtSale.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">
                  x{item.quantity}
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 text-right">
                  ${(item.priceAtSale * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 border-t border-gray-200">
            <tr>
              <td colSpan={3} className="px-6 py-4 text-right font-semibold text-gray-700">Grand Total</td>
              <td className="px-6 py-4 text-right font-bold text-green-600 text-lg">
                ${sale.totalAmount.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
