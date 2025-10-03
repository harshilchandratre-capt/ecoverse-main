import { Package } from 'lucide-react';
import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-brand-gray-light cursor-pointer transform hover:-translate-y-1">
        <div className="flex">
          <div className="w-32 h-32 bg-brand-off-white flex items-center justify-center flex-shrink-0">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-12 h-12 text-brand-gray-light" />
            )}
          </div>
          <div className="p-5 flex-1">
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-medium rounded-full">
                  {product.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-brand-dark-gray mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                {product.price && (
                  <span className="text-lg font-semibold text-brand-green">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  (product.stock_quantity || 0) > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {(product.stock_quantity || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-brand-gray-light cursor-pointer transform hover:-translate-y-1">
      <div className="aspect-square bg-brand-off-white flex items-center justify-center">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-24 h-24 text-brand-gray-light" />
        )}
      </div>
      <div className="p-5">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-brand-dark-gray mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-3">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          {product.price && (
            <span className="text-lg font-semibold text-brand-green">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          )}
          <span className={`text-xs px-2 py-1 rounded-full ${
            (product.stock_quantity || 0) > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {(product.stock_quantity || 0) > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
}
