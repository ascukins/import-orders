
export type FulfillmentStage = 'In production' | 'Quality Control' | 'Incoming' | 'Imported';
export type currency = number;
export interface Order {
  id: string;
  customer: string;
  created: Date;
  revenue: currency;
  cost: currency;
  price: currency;
  fulfillmentStage?: FulfillmentStage;
  orderVolume?: currency;
  amountOfProducts?: number;
  SKU?: string;
  orderItems?: OrderItem[];
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  zip: string;
  state: string;
  country: string;
}
export interface OrderItem {
  productId: string;
  name: string;
  sku: string;
  amount: number;
  price: currency;
  options: ProductOption[];
  option?: ProductOption;
  availableOptions: ProductOption[];
  selected?: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  amount: number;
  retailPrice: currency;
  availableOptions: ProductOption[];
}

export interface ProductOption {
  icon: string;
  text: string;
}
