export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  prepTime: number; // in minutes
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  customerName: string;
  estimatedTime: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export type Category = 'all' | 'breakfast' | 'lunch' | 'snacks' | 'beverages';
