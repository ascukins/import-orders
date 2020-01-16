
export type FulfillmentStage = 'In production' | 'Quality Control';
export type currency = number;
export interface Order {
  id: string;
  customer: string;
  created: Date;

  revenue: currency;
  cost: currency;
  price: currency;

  fulfillmentStage?: FulfillmentStage;
  //  orderVolume: currency;

  contents?: OrderContent[];

}

// export interface ExternalOrder{



// }


export interface OrderContent {
  productId: string;
  amountOfProducts: number;

}

export interface Product {
  id: string;
  name: string;
  sku: string;
}


/*
3) Is order Id in external orders unique compared to main order table?
*/
