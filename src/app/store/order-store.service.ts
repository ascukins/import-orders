import { Injectable } from '@angular/core';
import { Order } from '../models/models';
import { observable, action, computed } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {

  @observable mainOrders: Order[] = [];
  @observable importableOrders: Order[] = [];
  @observable selectedOrder: Order;

  constructor(private http: HttpClient) {
  }

  // The app might benefit from unidirectional data flow from API to store in case if data amount is not too large

  @action
  initMainOrders() {
    this.http.get<Order[]>('api/mainOrders')
      .pipe(
        catchError((error: any) => throwError(error.error || 'Server error')),
        tap(orders => this.mainOrders = orders)
      ).subscribe();
  }

  @action
  initImportableOrders() {
    this.http.get<Order[]>('api/importableOrders')
      .pipe(
        catchError((error: any) => throwError(error.error || 'Server error')),
        tap(orders => this.importableOrders = orders)
      ).subscribe();
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
