import Link from 'next/link';
import { HeartPulse, Search, ShoppingCart, User as UserIcon } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { logoutAction } from '@/app/actions/auth';

export default async function Navbar() {
  const session = await getSession();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-green-600 flex-shrink-0">
            <HeartPulse size={32} />
            <span className="text-2xl font-bold text-gray-900 hidden sm:block">MediStore</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for medicines, vitamins, etc..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
              />
              <Search className="absolute left-4 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Nav Links & Actions */}
          <div className="flex items-center gap-6">
            <Link href="/medicines" className="text-gray-600 hover:text-green-600 font-medium transition">
              Products
            </Link>
            
            <Link href="/cart" className="relative text-gray-600 hover:text-green-600 transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {session ? (
              <div className="flex items-center gap-4">
                {session.role === 'ADMIN' ? (
                  <Link href="/admin/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    Dashboard
                  </Link>
                ) : (
                  <Link href="/orders" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    My Orders
                  </Link>
                )}
                <form action={logoutAction}>
                  <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700">
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-gray-600 hover:text-green-600 font-medium transition flex items-center gap-2">
                  <UserIcon size={20} />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
