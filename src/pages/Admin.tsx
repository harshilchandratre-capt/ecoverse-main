import { useState, useEffect } from 'react';
import { Package, FileText, Plus, CreditCard as Edit2, Trash2, Upload, X, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../lib/supabase';
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct, getLandingContent, updateLandingContent } from '../lib/database';
import { uploadProductImage } from '../lib/storage';

type TabType = 'products' | 'content';

export default function Admin() {
  const { user, loading: authLoading, signIn } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    description: '',
    category: '',
    image_url: '',
    price: '',
    stock_quantity: '',
  });

  const [landingContent, setLandingContent] = useState({
    hero: {
      title: '',
      subtitle: '',
      tagline: '',
    },
    about: {
      title: '',
      description: '',
    },
    contact: {
      address: '',
      phone: '',
      email: '',
      hours: '',
    },
  });

  useEffect(() => {
    if (!authLoading && user) {
      fetchProducts();
      fetchLandingContent();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLandingContent = async () => {
    try {
      const contentMap = await getLandingContent();
      setLandingContent(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = {
        name: productFormData.name,
        description: productFormData.description,
        category: productFormData.category,
        image_url: productFormData.image_url || null,
        price: productFormData.price ? parseInt(productFormData.price) : null,
        stock_quantity: productFormData.stock_quantity ? parseInt(productFormData.stock_quantity) : 0,
        is_active: true,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        showSuccess('Product updated successfully!');
      } else {
        await createProduct(productData);
        showSuccess('Product added successfully!');
      }

      setShowModal(false);
      setEditingProduct(null);
      setProductFormData({ name: '', description: '', category: '', image_url: '', price: '', stock_quantity: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      image_url: product.image_url || '',
      price: product.price?.toString() || '',
      stock_quantity: product.stock_quantity?.toString() || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteProduct(id);
      showSuccess('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadProductImage(file);
      setProductFormData({ ...productFormData, image_url: imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const handleContentSave = async () => {
    try {
      for (const section of ['hero', 'about', 'contact'] as const) {
        await updateLandingContent(section, landingContent[section]);
      }

      showSuccess('Landing page content updated successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content');
    }
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-brand-white-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-white-light flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-brand-dark-gray mb-6 text-center">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-green text-white py-2 rounded-lg font-medium hover:bg-brand-green/90 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-white-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
            {successMessage}
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-dark-gray mb-6">Admin Dashboard</h1>
          <div className="flex space-x-2 border-b border-brand-gray-light">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                activeTab === 'products'
                  ? 'border-b-2 border-brand-green text-brand-green'
                  : 'text-brand-dark-gray hover:text-brand-green'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Product Management</span>
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                activeTab === 'content'
                  ? 'border-b-2 border-brand-green text-brand-green'
                  : 'text-brand-dark-gray hover:text-brand-green'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Landing Page Content</span>
            </button>
          </div>
        </div>

        {activeTab === 'products' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-brand-dark-gray">Products</h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductFormData({ name: '', description: '', category: '', image_url: '' });
                  setShowModal(true);
                }}
                className="flex items-center space-x-2 bg-brand-green text-white px-5 py-2 rounded-lg font-medium hover:bg-brand-green/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Product</span>
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-brand-dark-gray text-lg">
                  No products yet. Click "Add Product" to get started.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-brand-gray-light">
                  <thead className="bg-brand-off-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase">
                        Description
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-brand-dark-gray uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-brand-gray-light">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              {product.image_url ? (
                                <img
                                  className="h-10 w-10 rounded object-cover"
                                  src={product.image_url}
                                  alt={product.name}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded bg-brand-off-white flex items-center justify-center">
                                  <Upload className="w-5 h-5 text-brand-gray-light" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-brand-dark-gray">
                                {product.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-brand-green/10 text-brand-green">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-brand-dark-gray">
                            {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            (product.stock_quantity || 0) > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock_quantity || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {product.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-brand-green hover:text-brand-green/80 mr-4"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold text-brand-dark-gray mb-6">
                Edit Landing Page Content
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark-gray mb-4">Hero Section</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={landingContent.hero.tagline}
                        onChange={(e) =>
                          setLandingContent({
                            ...landingContent,
                            hero: { ...landingContent.hero, tagline: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={landingContent.hero.title}
                        onChange={(e) =>
                          setLandingContent({
                            ...landingContent,
                            hero: { ...landingContent.hero, title: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                        Subtitle
                      </label>
                      <textarea
                        value={landingContent.hero.subtitle}
                        onChange={(e) =>
                          setLandingContent({
                            ...landingContent,
                            hero: { ...landingContent.hero, subtitle: e.target.value },
                          })
                        }
                        rows={3}
                        className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-brand-dark-gray mb-4">About Section</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={landingContent.about.title}
                        onChange={(e) =>
                          setLandingContent({
                            ...landingContent,
                            about: { ...landingContent.about, title: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                        Description
                      </label>
                      <textarea
                        value={landingContent.about.description}
                        onChange={(e) =>
                          setLandingContent({
                            ...landingContent,
                            about: { ...landingContent.about, description: e.target.value },
                          })
                        }
                        rows={5}
                        className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-brand-dark-gray mb-4">Contact Section</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={landingContent.contact.address}
                        onChange={(e) =>
                          setLandingContent({
                            ...landingContent,
                            contact: { ...landingContent.contact, address: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={landingContent.contact.phone}
                        onChange={(e) =>
                          setLandingContent({
                            ...landingContent,
                            contact: { ...landingContent.contact, phone: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={landingContent.contact.email}
                        onChange={(e) =>
                          setLandingContent({
                            ...landingContent,
                            contact: { ...landingContent.contact, email: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                        Business Hours
                      </label>
                      <textarea
                        value={landingContent.contact.hours}
                        onChange={(e) =>
                          setLandingContent({
                            ...landingContent,
                            contact: { ...landingContent.contact, hours: e.target.value },
                          })
                        }
                        rows={3}
                        className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-gray-light">
                  <button
                    onClick={handleContentSave}
                    className="flex items-center space-x-2 bg-brand-green text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-green/90 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-brand-gray-light">
              <h2 className="text-2xl font-bold text-brand-dark-gray">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                }}
                className="text-brand-dark-gray hover:text-brand-green"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                  Category
                </label>
                <select
                  value={productFormData.category}
                  onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                >
                  <option value="">Select a category</option>
                  <option value="Bottle Caps">Bottle Caps</option>
                  <option value="Pesticide Bottles">Pesticide Bottles</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                  Description
                </label>
                <textarea
                  value={productFormData.description}
                  onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={productFormData.stock_quantity}
                    onChange={(e) => setProductFormData({ ...productFormData, stock_quantity: e.target.value })}
                    className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark-gray mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border border-brand-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                {productFormData.image_url && (
                  <img
                    src={productFormData.image_url}
                    alt="Preview"
                    className="mt-4 h-32 w-32 object-cover rounded"
                  />
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                  }}
                  className="px-5 py-2 border border-brand-gray-light text-brand-dark-gray rounded-lg font-medium hover:bg-brand-off-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-green text-white rounded-lg font-medium hover:bg-brand-green/90 transition-colors"
                >
                  {editingProduct ? 'Update' : 'Create'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
