import { Injectable } from '@angular/core';
import { Order, OrderItem, Address, Customer, ProductOption } from '../models/models';
import { observable, action, computed } from 'mobx-angular';


export function pickRandomly(arr: any[]) {
  if (Array.isArray(arr) && arr.length) {
    const choice = Math.floor(Math.random() * arr.length - 0.0000001);
    return arr[choice];
  } else {
    return null;
  }
}
export function randomArray(approxLength: number, getItem: () => any) {
  const length = Math.round(approxLength / 2 + Math.random() * approxLength);
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(getItem());
  }
  return array;
}

export function randomAddress(): Address {
  const address: Address = {
    street: pickRandomly(['Brivibas iela', 'Agatan', 'Beehive street', 'Mazkupenas iela', 'Calle Nevada']),
    city: pickRandomly(['Riga', 'New-York', 'Reno', 'Paris', 'Ventspils', 'Moscow']),
    zip: String(Math.floor(Math.random() * 1000000)),
    state: pickRandomly(['Grkalnas pagasts', 'LA', 'NY', 'CA', 'TX']),
    country: pickRandomly(['USA', 'France', 'Italy', 'Latvia'])
  };
  return address;
}

export function randomCustomer(): Customer {
  const names = ['John', 'Doe', 'Patrick', 'Linda', 'Bill', 'Peter', 'Ivan', 'Jackson', 'Barbara', 'Ieva', 'Norton', 'Donald'];
  const customer: Customer = {
    name: pickRandomly(names) + ' ' + pickRandomly(names),
    address: randomAddress()
  };
  return customer;
}

export function randomProductOption(): ProductOption {
  const productOption: ProductOption = {
    icon: pickRandomly(['pregnant_woman', 'sports_handball', 'android', 'build', 'eco', 'rowing', 'pets', 'wc', 'house', 'bathtub',
      'casino', 'spa', 'sports_golf']),
    text: pickRandomly(['Heavy Wool', 'Cotton', 'Cotton', 'Light', 'Bold', 'Wide', 'Narrow', 'Slim', 'Oversize', 'Small', 'Large',
      'Red', 'Green', 'Blue', 'Yellow', 'Violet', 'Black', 'White', 'Junior', 'Senior', 'Gift-boxed', 'Outlet'])
  };
  return productOption;
}

export function randomOrderItem(): OrderItem {
  const cost = -Math.floor(Math.random() * 4000);
  const price = -Math.floor(cost - cost * 0.5 * Math.random());
  const orderItem: OrderItem = {
    productId: String(Math.floor(Math.random() * 1000000)),
    name: pickRandomly(['Christmas Dog Socks', 'Christmas Cat Socks', 'Hat', 'Shirt', 'T-shirt', 'Gloves', 'Jacket', 'Jeans']),
    SKU: pickRandomly(['SOCK_101_BIG_1', 'SPOON_123_BIG_1', 'ITEM_99_HZ_5',
      'OTHER_' + (Math.floor(Math.random() * 1000)), 'ITEM_' + (Math.floor(Math.random() * 1000)),
      'WEAR_' + (Math.floor(Math.random() * 1000))]),
    amount: Math.floor(1 + Math.random() * 12),
    revenue: -(price + cost),
    cost,
    price,
    options: [],
    selected: true,
    availableOptions: randomArray(4, randomProductOption)
  };
  return orderItem;
}

export function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function randomOrder(): Order {
  const order: Order = {
    id: '#' + String(Math.floor(Math.random() * 1000000)),
    created: randomDate(new Date('2019-01-01'), new Date('2020-01-01')),
    customer: randomCustomer(),
    fulfillmentStage: pickRandomly(['In production', 'Quality Control']),
    orderItems: randomArray(3, randomOrderItem)
  };
  return order;
}



@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {

  @observable mainOrders: Order[];
  @observable importableOrders: Order[];
  @observable selectedOrder: Order;

  constructor() {
    // TODO remove
    // console.log('store init');
    this.mainOrders = randomArray(4, randomOrder);
    this.importableOrders = randomArray(20, randomOrder);
    this.importableOrders.forEach(o => o.fulfillmentStage = 'Incoming');
  }

  @computed
  get selectedOrderSelectedItems() {
    if (this.selectedOrder) {
      return this.selectedOrder.orderItems.filter(i => i.selected);
    } else {
      return [];
    }
  }

  @computed
  get selectedOrderCost() {
    let sum = 0;
    this.selectedOrderSelectedItems.forEach(i => sum += i.cost * i.amount);
    return sum;
  }

  @computed
  get selectedOrderPrice() {
    let sum = 0;
    this.selectedOrderSelectedItems.forEach(i => sum += i.price * i.amount);
    return sum;
  }

  @action
  setSelectedOrder(order: Order) {
    this.selectedOrder = order;
  }

  @action
  deleteFromImportableOrders(order: Order) {
    this.importableOrders = this.importableOrders.filter(o => o.id !== order.id);
  }

  @action
  addToMainOrders(order: Order) {
    this.mainOrders = [...this.mainOrders, order];
  }

  @action
  addImportedToMainOrders(order: Order) {
    order.fulfillmentStage = 'Imported';
    this.addToMainOrders(order);
  }


}
