import { Link, useLocation } from 'react-router-dom';
import { Package } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-brand-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-brand-green" />
            <span className="text-xl font-semibold text-brand-dark-gray">
              Ecoverse
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-brand-green'
                  : 'text-brand-dark-gray hover:text-brand-green'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/products'
                  ? 'text-brand-green'
                  : 'text-brand-dark-gray hover:text-brand-green'
              }`}
            >
              Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
