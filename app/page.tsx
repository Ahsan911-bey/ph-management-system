export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Pharmacy Management System</h1>
      <p className="text-lg text-gray-600 mb-8">Professional pharmacy solution for managing inventory, sales, and customers.</p>
      <div className="flex gap-4">
        <a href="/medicines" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Browse Medicines
        </a>
        <a href="/login" className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition">
          Admin Login
        </a>
      </div>
    </div>
  )
}
