import { Injectable } from '@angular/core';
import { Order, OrderItem, Address } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {

  mainOrders: Order[];
  externalOrders: Order[];

  constructor() {
    // TODO remove
    // console.log('store init');
    const items: OrderItem[] = [
      {
        productId: '1',
        name: 'Christmas Dog Socks',
        sku: 'SOCK_101_BIG_1',
        amount: 4,
        price: 8.99,
        options: [],
        availableOptions: [
          {
            text: 'Heavy Wool Socks',
            icon: 'pregnant_woman'
          },
          {
            text: 'Crew Socks',
            icon: 'sports_handball'
          },
          {
            text: 'Light Socks',
            icon: 'android'
          }
        ]
      },

      {
        productId: '2',
        name: 'Christmas Cat Socks',
        sku: 'SOCK_201_BIG_1',
        amount: 3,
        price: 9.15,
        options: [],
        availableOptions: [
          {
            text: 'Heavy Wool Socks',
            icon: 'pregnant_woman'
          },
          {
            text: 'Crew Socks',
            icon: 'sports_handball'
          },
          {
            text: 'Light Socks',
            icon: 'android'
          }
        ],
        selected: true
      },
    ];


    const address: Address = {
      street: 'lorem ipsum street address',
      city: 'Riga',
      zip: 'LV-1017',
      state: 'CA',
      country: 'USA'
    }


    this.mainOrders = [
      {
        id: '#1234',
        customer: 'John Doe',
        created: new Date('03-15 14:14'),
        revenue: 5.15,
        cost: -15.15,
        price: 10,
        fulfillmentStage: 'In production'
      },
      {
        id: '#1235',
        customer: 'John Doe',
        created: new Date('03-16 15:14'),
        revenue: 5.15,
        cost: -15.15,
        price: 10,
        fulfillmentStage: 'Quality Control'
      },
    ];

    this.externalOrders = [
      {
        id: '#1234',
        customer: 'John Doe',
        created: new Date('04-15 14:14'),
        revenue: 5.15,
        cost: -15.15,
        price: 10,
        fulfillmentStage: 'Incoming',
        amountOfProducts: 2,
        orderVolume: 54.43,
        SKU: 'SOCK_101_BIG_1',
        orderItems: items,
        address
      },
      {
        id: '#1235',
        customer: 'John Doe',
        created: new Date('05-17 14:14'),
        revenue: 5.15,
        cost: -15.15,
        price: 10,
        fulfillmentStage: 'Incoming',
        amountOfProducts: 3,
        orderVolume: 64.43,
        SKU: 'SOCK_101_BIG_2',
        orderItems: items,
        address
      },
      {
        id: '#1135',
        customer: 'Donald Trump',
        created: new Date('06-22 11:00'),
        revenue: 5.15,
        cost: -15.15,
        price: 10,
        fulfillmentStage: 'Incoming',
        amountOfProducts: 40,
        orderVolume: 19.99,
        SKU: 'SPOON_123_BIG_1',
        orderItems: items,
        address
      },
      {
        id: '#1136',
        customer: 'Hillary Clinton',
        created: new Date('06-23 18:40'),
        revenue: 5.15,
        cost: -15.15,
        price: 10,
        fulfillmentStage: 'Incoming',
        amountOfProducts: 8,
        orderVolume: 1504.11,
        SKU: 'ITEM_99_HZ_5',
        orderItems: items,
        address
      },
      {
        id: '#1352',
        customer: 'Peter Norton',
        created: new Date('05-17 14:14'),
        revenue: 5.15,
        cost: -15.15,
        price: 10,
        fulfillmentStage: 'Incoming',
        amountOfProducts: 23,
        orderVolume: 614.43,
        SKU: 'SOCK_101_BIG_2',
        orderItems: items,
        address
      },
      {
        id: '#135',
        customer: 'Bill Gates',
        created: new Date('06-22 11:00'),
        revenue: 5.15,
        cost: -15.15,
        price: 10,
        fulfillmentStage: 'Incoming',
        amountOfProducts: 4,
        orderVolume: 196.99,
        SKU: 'SPOON_123_BIG_1',
        orderItems: items,
        address
      },
    ];


  }

  deleteFromExternalOrders(order: Order) {
    this.externalOrders = this.externalOrders.filter(o => o.id !== order.id);
  }

  addToMainOrders(order: Order) {
    this.mainOrders = [...this.mainOrders, order];
  }

  addImportedToMainOrders(order: Order) {
    order.fulfillmentStage = 'Imported';
    this.addToMainOrders(order);
  }


}
