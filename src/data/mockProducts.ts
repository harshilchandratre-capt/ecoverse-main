import { Product } from '../lib/supabase';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Glass Bottle Cap - Silver',
    description: 'High-quality silver-colored bottle cap made from premium materials. Perfect for wine bottles, spirits, and premium beverages. Features a smooth finish and excellent seal.',
    category: 'Bottle Caps',
    image_url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&h=500&fit=crop&crop=center',
    price: 250,
    stock_quantity: 150,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Gold-Plated Wine Bottle Cap',
    description: 'Luxurious gold-plated bottle cap with elegant design. Ideal for premium wine collections and special occasions. Provides excellent preservation and aesthetic appeal.',
    category: 'Bottle Caps',
    image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop&crop=center',
    price: 499,
    stock_quantity: 75,
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    name: 'Plastic Bottle Cap - Blue',
    description: 'Durable plastic bottle cap in vibrant blue color. Suitable for water bottles, soft drinks, and various beverages. Lightweight and recyclable.',
    category: 'Bottle Caps',
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop&crop=center',
    price: 99,
    stock_quantity: 0,
    created_at: '2024-01-17T10:00:00Z',
    updated_at: '2024-01-17T10:00:00Z'
  },
  {
    id: '4',
    name: 'Stainless Steel Bottle Cap',
    description: 'Heavy-duty stainless steel bottle cap with superior durability. Resistant to corrosion and ideal for industrial applications and premium products.',
    category: 'Bottle Caps',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center',
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z'
  },
  {
    id: '5',
    name: '500ml Pesticide Bottle',
    description: 'Professional-grade 500ml pesticide bottle made from high-density polyethylene. Features child-resistant cap and clear measurement markings for precise application.',
    category: 'Pesticide Bottles',
    image_url: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc8?w=500&h=500&fit=crop&crop=center',
    price: 1299,
    stock_quantity: 50,
    created_at: '2024-01-19T10:00:00Z',
    updated_at: '2024-01-19T10:00:00Z'
  },
  {
    id: '6',
    name: '1L Agricultural Spray Bottle',
    description: 'Large capacity 1-liter spray bottle designed for agricultural use. Includes adjustable spray nozzle and ergonomic handle for comfortable operation.',
    category: 'Pesticide Bottles',
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop&crop=center',
    price: 1850,
    stock_quantity: 25,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  },
  {
    id: '7',
    name: '2L Heavy-Duty Pesticide Container',
    description: 'Extra-large 2-liter container for bulk pesticide storage. Made from reinforced plastic with leak-proof design and UV-resistant material.',
    category: 'Pesticide Bottles',
    image_url: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc8?w=500&h=500&fit=crop&crop=center',
    created_at: '2024-01-21T10:00:00Z',
    updated_at: '2024-01-21T10:00:00Z'
  },
  {
    id: '8',
    name: '250ml Compact Spray Bottle',
    description: 'Compact 250ml spray bottle perfect for small-scale applications. Features fine mist spray pattern and secure locking mechanism.',
    category: 'Pesticide Bottles',
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop&crop=center',
    created_at: '2024-01-22T10:00:00Z',
    updated_at: '2024-01-22T10:00:00Z'
  },
  {
    id: '9',
    name: 'Copper Finish Bottle Cap',
    description: 'Elegant copper-finish bottle cap with vintage appeal. Perfect for craft beverages, artisanal products, and premium packaging solutions.',
    category: 'Bottle Caps',
    image_url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&h=500&fit=crop&crop=center',
    created_at: '2024-01-23T10:00:00Z',
    updated_at: '2024-01-23T10:00:00Z'
  },
  {
    id: '10',
    name: '5L Industrial Pesticide Drum',
    description: 'Large 5-liter industrial drum for commercial pesticide applications. Features reinforced construction and easy-pour spout design.',
    category: 'Pesticide Bottles',
    image_url: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc8?w=500&h=500&fit=crop&crop=center',
    created_at: '2024-01-24T10:00:00Z',
    updated_at: '2024-01-24T10:00:00Z'
  },
  {
    id: '11',
    name: 'Chrome Bottle Cap Set',
    description: 'Set of premium chrome bottle caps with mirror finish. Ideal for luxury beverage brands and high-end packaging applications.',
    category: 'Bottle Caps',
    image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop&crop=center',
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-01-25T10:00:00Z'
  },
  {
    id: '12',
    name: '750ml Professional Spray Bottle',
    description: 'Professional-grade 750ml spray bottle with precision nozzle. Designed for commercial use with consistent spray patterns and durability.',
    category: 'Pesticide Bottles',
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop&crop=center',
    created_at: '2024-01-26T10:00:00Z',
    updated_at: '2024-01-26T10:00:00Z'
  },
  {
    id: '13',
    name: 'Matte Black Bottle Cap',
    description: 'Sleek matte black bottle cap with modern design. Perfect for contemporary beverage brands and minimalist packaging aesthetics.',
    category: 'Bottle Caps',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center',
    created_at: '2024-01-27T10:00:00Z',
    updated_at: '2024-01-27T10:00:00Z'
  },
  {
    id: '14',
    name: '1.5L Garden Spray Bottle',
    description: 'Large 1.5-liter garden spray bottle with extended reach wand. Perfect for garden maintenance and outdoor pest control applications.',
    category: 'Pesticide Bottles',
    image_url: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc8?w=500&h=500&fit=crop&crop=center',
    created_at: '2024-01-28T10:00:00Z',
    updated_at: '2024-01-28T10:00:00Z'
  },
  {
    id: '15',
    name: 'Rose Gold Bottle Cap',
    description: 'Elegant rose gold bottle cap with premium finish. Ideal for luxury brands, special editions, and high-end beverage packaging.',
    category: 'Bottle Caps',
    image_url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&h=500&fit=crop&crop=center',
    created_at: '2024-01-29T10:00:00Z',
    updated_at: '2024-01-29T10:00:00Z'
  },
  {
    id: '16',
    name: '3L Bulk Pesticide Container',
    description: 'Heavy-duty 3-liter container for bulk pesticide storage and distribution. Features reinforced handles and stackable design.',
    category: 'Pesticide Bottles',
    image_url: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc8?w=500&h=500&fit=crop&crop=center',
    created_at: '2024-01-30T10:00:00Z',
    updated_at: '2024-01-30T10:00:00Z'
  }
];

export const categories = ['All', 'Bottle Caps', 'Pesticide Bottles'];
