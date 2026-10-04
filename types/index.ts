export type Category =
  | 'Silk'
  | 'Banarasi'
  | 'Kanjivaram'
  | 'Cotton'
  | 'Chiffon'
  | 'Georgette'
  | 'Bridal';

export type Occasion = 'Wedding' | 'Festive' | 'Party' | 'Daily Wear';

export type Tag = 'new' | 'bestseller' | 'handloom' | 'limited';

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  fabric: string;
  color: string;
  colorHex: string;
  occasion: Occasion;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  description: string;
  care: string;
  blousePiece: boolean;
  length: string;
  weave: string;
  tags: Tag[];
  drapingTips: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  quote: string;
  rating: number;
  product: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

export interface Weaver {
  id: string;
  name: string;
  location: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'flat';
  value: number;
  minOrder: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  status: string;
  date: string;
  address: Address;
  paymentMethod: string;
}

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface PincodeResult {
  serviceable: boolean;
  city: string;
  state: string;
  estimatedDays: number;
  codAvailable: boolean;
}

export interface NewsletterSubscriber {
  email: string;
  date: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
}

export interface ProductQuery {
  category?: string;
  fabric?: string;
  occasion?: string;
  color?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
  search?: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  filters: {
    categories: string[];
    fabrics: string[];
    occasions: string[];
    colors: string[];
    priceRange: { min: number; max: number };
  };
}
