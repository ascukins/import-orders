import { Component, OnInit } from '@angular/core';
import { OrderStoreService } from 'src/app/store/order-store.service';
import { Order } from 'src/app/models/models';
import { MatDialog } from '@angular/material/dialog';
import { ImportOrdersDialogComponent } from '../import-orders-dialog/import-orders-dialog.component';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedOrderColumns: string[] = ['id', 'customerName', 'created', 'revenue', 'cost', 'price', 'fulfillmentStage'];

  constructor(
    public dialog: MatDialog,
    public store: OrderStoreService) { }

  ngOnInit() {
    this.store.initMainOrders();
  }

  openImportDialog() {
    this.store.initImportableOrders();
    const dialogRef = this.dialog.open(ImportOrdersDialogComponent);
    dialogRef.afterClosed().subscribe((order: Order) => {
      this.store.setSelectedOrder(order);
      if (order) {
        this.store.importSelectedOrder().subscribe(() => {
          this.store.setSelectedOrder(undefined);
        });
      }
    });
  }

  onRowClick(order: Order) {
    this.store.setSelectedOrder(order);
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.store.setSelectedOrder(undefined);
    });
  }

}
