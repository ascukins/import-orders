import { Component } from '@angular/core';
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
export class OrdersComponent {
  displayedOrderColumns: string[] = ['id', 'customer', 'created', 'revenue', 'cost', 'price', 'fulfillmentStage'];
  importedOrder: Order;

  constructor(
    public dialog: MatDialog,
    public store: OrderStoreService) { }

  openImportDialog() {
    const dialogRef = this.dialog.open(ImportOrdersDialogComponent, {
      width: '250px',
      data: { importedOrder: this.importedOrder }
    });

    dialogRef.afterClosed().subscribe((order: Order) => {
      this.importedOrder = order;
      if (order) {
        this.store.addImportedToMainOrders(order);
        this.store.deleteFromExternalOrders(order);
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
