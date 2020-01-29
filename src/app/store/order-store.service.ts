import { Injectable } from '@angular/core';
import { Order } from '../models/models';
import { observable, action, computed } from 'mobx-angular';
import { tap, flatMap } from 'rxjs/operators';
import { OrderApiService } from '../services/order-api.service';


@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {

  @observable mainOrders: Order[] = [];
  @observable importableOrders: Order[] = [];
  @observable selectedOrder: Order;

  constructor(private orderApi: OrderApiService) { }

  // Computed

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

  // Actions

  @action
  setSelectedOrder(order: Order) {
    this.selectedOrder = order;
  }

  // The app might benefit from unidirectional data flow from API to store in case if data amount is not too large

  @action
  initMainOrders() {
    this.orderApi.getMainOrders().pipe(
      tap(orders => this.mainOrders = orders)
    ).subscribe();
  }

  @action
  initImportableOrders() {
    this.orderApi.getImportableOrders().pipe(
      tap(orders => this.importableOrders = orders)
    ).subscribe();
  }


  @action
  deleteFromImportableOrders(order: Order) {
    return this.orderApi.deleteImportableOrder(order).pipe(
      tap(() => this.importableOrders = this.importableOrders.filter(o => o.id !== order.id))
    );
  }

  @action
  addToMainOrders(order: Order) {
    return this.orderApi.postToMainOrders(order)
      .pipe(
        tap(() => this.mainOrders = [...this.mainOrders, order])
      );
  }

  @action importSelectedOrder() {
    if (this.selectedOrderSelectedItems.length) {
      this.selectedOrder.fulfillmentStage = 'Imported';
    } else {
      this.selectedOrder.fulfillmentStage = 'Cancelled';
    }
    return this.addToMainOrders(this.selectedOrder).pipe(
      flatMap(() => this.deleteFromImportableOrders(this.selectedOrder)),
      tap(() => this.initMainOrders())
    );
  }

}
