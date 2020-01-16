import { Injectable } from '@angular/core';
import { Order } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {

  mainOrders: Order[];

  constructor() {
    // TODO remove
    console.log('store init');
    this.mainOrders = [
      {
        id: '#1234',
        customer: 'John Doe',
        created: new Date(),
        revenue: 5.15,
        cost: -15.15,
        price: 10,
        fulfillmentStage: 'In production'
      },
      {
        id: '#1235',
        customer: 'John Doe',
        created: new Date(),
        revenue: 5.15,
        cost: -15.15,
        price: 10,
        fulfillmentStage: 'Quality Control'
      },
    ];


  }

}
