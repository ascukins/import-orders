
export type FulfillmentStage = 'In production' | 'Quality Control' | 'Incoming' | 'Imported';
export type currency = number;
export interface Order {
  id: string;
  created: Date;
  customer: Customer;
  fulfillmentStage: FulfillmentStage;
  orderItems: OrderItem[];
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
  option?: ProductOption;
  availableOptions: ProductOption[];
  selected: boolean;
}

export interface ProductOption {
  icon: string;
  text: string;
}

// export interface Product {
//   id: string;
//   name: string;
//   SKU: string;
//   retailPrice: currency;
//   availableOptions: ProductOption[];
// }
