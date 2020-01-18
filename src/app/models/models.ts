
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

  orderedItems?: OrderedItem[];
}

export interface OrderedItem {
  productId: string;
  name: string;
  sku: string;
  amount: number;
  price: currency;
  options: string[];
  selected?: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  amount: number;
  retailPrice: currency;
  availableOptions: string[];
}
