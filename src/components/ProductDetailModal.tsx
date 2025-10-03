import { X, Package } from 'lucide-react';
import { Product } from '../lib/supabase';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-brand-gray-light p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-brand-dark-gray">Product Details</h2>
          <button
            onClick={onClose}
            className="text-brand-dark-gray hover:text-brand-green transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-brand-off-white rounded-lg flex items-center justify-center overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="w-32 h-32 text-brand-gray-light" />
              )}
            </div>

            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 bg-brand-green/10 text-brand-green text-sm font-medium rounded-full">
                  {product.category}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-brand-dark-gray mb-4">
                {product.name}
              </h3>

              <div className="prose prose-sm max-w-none">
                <h4 className="text-lg font-semibold text-brand-dark-gray mb-2">
                  Description
                </h4>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-gray-light">
                <h4 className="text-sm font-semibold text-brand-dark-gray mb-3">
                  Product Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-brand-dark-gray">{product.category}</span>
                  </div>
                  {product.price && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium text-brand-green text-lg">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock:</span>
                    <span className={`font-medium ${
                      (product.stock_quantity || 0) > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {(product.stock_quantity || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product ID:</span>
                    <span className="font-medium text-brand-dark-gray">
                      {product.id.slice(0, 8).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onClose}
                  className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
