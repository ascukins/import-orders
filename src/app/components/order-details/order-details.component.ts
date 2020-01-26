import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Order, OrderItem } from 'src/app/models/models';
import { OrderStoreService } from 'src/app/store/order-store.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent {

  constructor(public store: OrderStoreService) { }

}
