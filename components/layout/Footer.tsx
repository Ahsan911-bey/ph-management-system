import { HeartPulse } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-green-600 mb-4">
              <HeartPulse size={28} />
              <span className="text-xl font-bold text-gray-900">MediStore</span>
            </div>
            <p className="text-gray-500 text-sm">
              Your trusted partner for health and wellness. Professional pharmacy solutions delivered directly to your door.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-green-600 transition">Painkillers</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Antibiotics</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Vitamins & Supplements</a></li>
              <li><a href="#" className="hover:text-green-600 transition">First Aid</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-green-600 transition">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-green-600 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>123 Health Avenue</li>
              <li>Medical District, MD 12345</li>
              <li>support@medistore.com</li>
              <li>1-800-MED-HELP</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MediStore Pharmacy Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
