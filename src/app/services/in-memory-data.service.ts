import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Address, Customer, ProductOption, OrderItem, Order } from '../models/models';


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
    const item = getItem();
    if (item.id) {
      const foundIndex = array.findIndex(e => e.id === item.id);
      if (foundIndex >= 0) {
        array[foundIndex] = item;
      } else {
        array.push(item);
      }
    } else {
      array.push(item);
    }
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
  const cost = -Math.floor(Math.random() * 2000) - 1;
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
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())); // TODO .toISOString();
}

export function randomOrder(): Order {
  const customer = randomCustomer();
  const order: Order = {
    id: String(Math.floor(Math.random() * 999999)).padStart(6, '0'),
    created: randomDate(new Date('2019-01-01'), new Date('2019-12-31')),
    customer,
    customerName: customer.name,
    fulfillmentStage: pickRandomly(['In production', 'Quality Control']),
    orderItems: randomArray(2, randomOrderItem)
  };
  return order;
}

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const mainOrders = randomArray(4, randomOrder);
    const importableOrders = randomArray(5000, randomOrder);
    importableOrders.forEach(o => o.fulfillmentStage = 'Incoming');
    return { mainOrders, importableOrders };
  }
}
