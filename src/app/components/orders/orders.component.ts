import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderStoreService } from 'src/app/store/order-store.service';
import { Order } from 'src/app/models/models';
import { MatDialog } from '@angular/material/dialog';
import { ImportOrdersDialogComponent } from '../import-orders-dialog/import-orders-dialog.component';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';
import { OrdersTableComponent } from '../orders-table/orders-table.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @ViewChild(OrdersTableComponent, { static: true }) ordersTable: OrdersTableComponent;
  displayedOrderColumns: string[] = ['id', 'customerName', 'created', 'revenue', 'cost', 'price', 'fulfillmentStage'];

  constructor(
    public dialog: MatDialog,
    public store: OrderStoreService) { }

  ngOnInit() { }

  openImportDialog() {
    const dialogRef = this.dialog.open(ImportOrdersDialogComponent);
    dialogRef.afterClosed().subscribe((order: Order) => {
      this.store.setSelectedOrder(order);
      if (order) {
        this.store.importSelectedOrder().subscribe(() => {
          this.store.setSelectedOrder(undefined);
          this.ordersTable.filtersUpdate.next(order);
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
