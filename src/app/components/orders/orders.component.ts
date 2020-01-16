import { Component, OnInit } from '@angular/core';
import { OrderStoreService } from 'src/app/store/order-store.service';
import { Order } from 'src/app/models/models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedOrderColumns: string[] = ['id', 'customer', 'created', 'revenue', 'cost', 'price', 'fulfillmentStage'];

  constructor(public store: OrderStoreService) {
    // TODO remove
    console.log('OrdersComponent init');
  }

  getOrderCellValue(order: Order, cell: string) {
    const dateOptions = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    switch (cell) {
      case 'created':
        return order[cell].toLocaleDateString('en-US', dateOptions);
      case 'revenue':
      case 'cost':
      case 'price':
        if (order[cell] > 0) {
          return '+' + order[cell];
        }
      default:
        return order[cell];
    }
  }

  ngOnInit() {
  }

}
