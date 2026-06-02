export default function MedicinesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Medicines</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Medicine cards will go here */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-900">Paracetamol</h3>
            <p className="text-sm text-gray-500 mt-1">Pain relief</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold text-green-600">$5.00</span>
              <span className="text-sm text-gray-500">In stock: 100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
