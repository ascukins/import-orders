
export type FulfillmentStage = 'In production' | 'Quality Control' | 'Incoming' | 'Imported' | 'Cancelled';
export type currency = number;
export interface Order {
  id: string;
  created: Date;
  customer: Customer;
  customerName: string;
  fulfillmentStage: FulfillmentStage;
  orderItems: OrderItem[];
  // some fields may be added for caching purposes
  // revenue: currency;
  // cost: currency;
  // price: currency;
  // amountOfProducts?: number;
  // SKU?: string;
}

export interface Customer {
  name: string;
  address: Address;
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
  SKU: string;
  amount: number;
  revenue: currency;
  cost: currency;
  price: currency;
  options?: ProductOption[];
  availableOptions: ProductOption[];
  selected: boolean;
}

export interface ProductOption {
  icon: string;
  text: string;
}

// Data structure can be improved by separating product entity like this:
//
// export interface Product {
//   id: string;
//   name: string;
//   SKU: string;
//   retailPrice: currency;
//   availableOptions: ProductOption[];
// }
