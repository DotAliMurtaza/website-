import { Product } from '@/src/data/products';

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  quantity: number;
  withStitching?: boolean;
  stitchingType?: 'standard' | 'express';
  stitchingPrice?: number;
  unitPrice: number;
  lineTotal: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  email?: string;
  notes?: string;
}

export interface OrderSummaryData {
  orderId: string;
  customer: CustomerInfo;
  items: CartItem[];
  totalQuantity: number;
  grandTotal: number;
  placedAt: string;
}
