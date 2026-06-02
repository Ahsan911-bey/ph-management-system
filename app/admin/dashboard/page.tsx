import prisma from '@/lib/prisma';
import { Pill, AlertCircle, ShoppingCart } from 'lucide-react';

export default async function DashboardPage() {
  const medicineCount = await prisma.medicine.count();
  const salesCount = await prisma.sale.count();
  const totalSales = await prisma.sale.aggregate({ _sum: { totalAmount: true } });
  
  const lowStockCount = await prisma.medicine.count({
    where: { stock: { lte: 10 } }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Pill size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Medicines</h3>
            <p className="text-2xl font-bold text-gray-900">{medicineCount}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <ShoppingCart size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900">{salesCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <span className="font-bold text-xl">$</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">${(totalSales._sum.totalAmount || 0).toFixed(2)}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Low Stock Alerts</h3>
            <p className="text-2xl font-bold text-red-600">{lowStockCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
