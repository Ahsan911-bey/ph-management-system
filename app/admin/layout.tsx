export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar placeholder */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-lg font-bold text-green-600">Admin Panel</h1>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/admin/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Dashboard</a>
          <a href="/admin/medicines" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Medicines</a>
          <a href="/admin/categories" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Categories</a>
          <a href="/admin/customers" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Customers</a>
          <a href="/admin/sales" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Sales</a>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8">
          <button className="text-gray-500 hover:text-gray-700">Logout</button>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
