import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LayoutDashboard, Pill, Tags, Users, ShoppingCart, LogOut, Home } from 'lucide-react';
import Link from 'next/link';
import { logoutAction } from '@/app/actions/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2 text-green-600">
            <Pill size={24} />
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </Link>
        </div>
        <nav className="p-4 space-y-1 flex-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/medicines" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition font-medium">
            <Pill size={20} /> Medicines
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition font-medium">
            <Tags size={20} /> Categories
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition font-medium">
            <Users size={20} /> Customers
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition font-medium">
            <ShoppingCart size={20} /> Orders
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Link href="/" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-900 transition mb-2">
            <Home size={18} /> View Store
          </Link>
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
              <LogOut size={18} /> Logout
            </button>
          </form>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-medium text-gray-800">Admin Dashboard</h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <span className="text-sm font-medium text-gray-700">Administrator</span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
