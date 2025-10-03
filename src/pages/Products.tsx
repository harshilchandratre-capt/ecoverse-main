import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid3X3, List, Filter, SortAsc } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { Product } from '../lib/supabase';
import { getProducts, getCategories } from '../lib/database';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'newest'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, searchQuery, sortBy, priceRange, inStockOnly]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      
      setProducts(productsData);
      const categoryNames = ['All', ...categoriesData.map(cat => cat.name)];
      setCategories(categoryNames);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(p => {
      const price = p.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by stock availability
    if (inStockOnly) {
      filtered = filtered.filter(p => (p.stock_quantity || 0) > 0);
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="min-h-screen bg-brand-white-light">
      <div className="bg-brand-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Our Product Catalogue
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Browse our extensive selection of premium bottle caps and pesticide bottles
            sourced from trusted international suppliers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          {/* Search and Controls Row */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gray-light w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              {/* View Mode Toggle */}
              <div className="flex border border-brand-gray-light rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-brand-green text-white'
                      : 'bg-white text-brand-dark-gray hover:bg-brand-off-white'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-brand-green text-white'
                      : 'bg-white text-brand-dark-gray hover:bg-brand-off-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'category' | 'newest')}
                  className="appearance-none bg-white border border-brand-gray-light rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="category">Category</option>
                </select>
                <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-gray-light w-4 h-4 pointer-events-none" />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 border rounded-lg transition-colors flex items-center gap-2 ${
                  showFilters
                    ? 'bg-brand-green text-white border-brand-green'
                    : 'bg-white text-brand-dark-gray border-brand-gray-light hover:border-brand-green'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-brand-green text-white'
                  : 'bg-white text-brand-dark-gray border border-brand-gray-light hover:border-brand-green'
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.slice(1).map((category) => {
              const count = products.filter(p => p.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-5 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-brand-green text-white'
                      : 'bg-white text-brand-dark-gray border border-brand-gray-light hover:border-brand-green'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white border border-brand-gray-light rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-brand-dark-gray mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                    Price Range: ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full h-2 bg-brand-gray-light rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-brand-gray-light rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹0</span>
                    <span>₹10,000</span>
                  </div>
                </div>

                {/* Stock Filter */}
                <div>
                  <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                    Availability
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 text-brand-green border-brand-gray-light rounded focus:ring-brand-green"
                    />
                    <span className="text-sm text-brand-dark-gray">In Stock Only</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="mt-4 pt-4 border-t border-brand-gray-light">
                <button
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setInStockOnly(false);
                  }}
                  className="text-sm text-brand-green hover:text-brand-green/80 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="text-sm text-brand-dark-gray mb-4">
            Showing {filteredProducts.length} of {products.length} products
            {searchQuery && (
              <span> for "{searchQuery}"</span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brand-dark-gray text-lg">
              {searchQuery || selectedCategory !== 'All'
                ? 'No products found matching your criteria.'
                : 'No products available at the moment.'}
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredProducts.map((product) => (
              <div key={product.id} onClick={() => setSelectedProduct(product)}>
                <ProductCard product={product} viewMode={viewMode} />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
