import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Order, OrderItem } from 'src/app/models/models';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent implements OnChanges {

  @Input() order: Order;

  selectedItems: OrderItem[];

  ngOnChanges() {
    // if (this.dataSource) {
    //   this.dataSource.data = this.orderItems;
    // }
    // console.log(2342345);
    if (this.order) {
      this.selectedItems = this.order.orderItems.filter(i => i.selected);
    }
  }

  constructor() { }

}
