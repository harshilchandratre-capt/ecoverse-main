import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Droplets, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { getLandingContent } from '../lib/database';

interface LandingContent {
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
}

export default function Landing() {
  const [content, setContent] = useState<LandingContent>({
    hero: {
      title: 'Premium Imported Bottle Caps & Bottles',
      subtitle: 'Quality packaging solutions for the beverage and agricultural industries',
      tagline: 'Your trusted partner for premium packaging',
    },
    about: {
      title: 'About Our Company',
      description: 'We are a leading importer and distributor of premium bottle caps and pesticide bottles.',
    },
    contact: {
      address: '123 Industrial Way, Business District, City, State 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@premiumbottlecaps.com',
      hours: 'Monday - Friday: 8:00 AM - 6:00 PM',
    },
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const contentMap = await getLandingContent();
      setContent(contentMap as LandingContent);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  return (
    <div className="min-h-screen bg-brand-white-light">
      <section className="bg-brand-green text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm uppercase tracking-wide text-white/80 mb-4">
              {content.hero.tagline}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {content.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {content.hero.subtitle}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-white text-brand-green px-8 py-3 rounded-lg font-semibold hover:bg-brand-off-white transition-colors"
            >
              <span>View Our Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark-gray mb-4">
              {content.about.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {content.about.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark-gray mb-4">
              Our Product Categories
            </h2>
            <p className="text-lg text-gray-600">
              Explore our comprehensive range of packaging solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green/10 rounded-full mb-6">
                <Package className="w-10 h-10 text-brand-green" />
              </div>
              <h3 className="text-2xl font-semibold text-brand-dark-gray mb-4">
                Bottle Caps
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Premium imported bottle caps in various sizes and materials. Perfect for
                beverages, oils, and other liquid products.
              </p>
              <Link
                to="/products?category=Bottle Caps"
                className="inline-flex items-center space-x-2 text-brand-green font-medium hover:text-brand-green/80"
              >
                <span>View Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green/10 rounded-full mb-6">
                <Droplets className="w-10 h-10 text-brand-green" />
              </div>
              <h3 className="text-2xl font-semibold text-brand-dark-gray mb-4">
                Pesticide Bottles
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Durable and safe pesticide bottles designed for agricultural and
                industrial use. Available in multiple capacities.
              </p>
              <Link
                to="/products?category=Pesticide Bottles"
                className="inline-flex items-center space-x-2 text-brand-green font-medium hover:text-brand-green/80"
              >
                <span>View Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark-gray mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">
              Contact us for inquiries about our products and services
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green/10 rounded-full mb-4">
                  <MapPin className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="font-semibold text-brand-dark-gray mb-2">Address</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {content.contact.address}
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green/10 rounded-full mb-4">
                  <Phone className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="font-semibold text-brand-dark-gray mb-2">Phone</h3>
                <p className="text-gray-600 text-sm">
                  {content.contact.phone}
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green/10 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="font-semibold text-brand-dark-gray mb-2">Email</h3>
                <p className="text-gray-600 text-sm">
                  {content.contact.email}
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-brand-off-white rounded-lg p-6">
                <h3 className="font-semibold text-brand-dark-gray mb-2">Business Hours</h3>
                <p className="text-gray-600 text-sm whitespace-pre-line">
                  {content.contact.hours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
