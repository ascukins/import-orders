import { Component } from '@angular/core';
import { OrderStoreService } from 'src/app/store/order-store.service';
import { Order } from 'src/app/models/models';
import { MatDialog } from '@angular/material/dialog';
import { ImportOrdersDialogComponent } from '../import-orders-dialog/import-orders-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  displayedOrderColumns: string[] = ['id', 'customer', 'created', 'revenue', 'cost', 'price', 'fulfillmentStage'];
  importResult: any;

  constructor(
    public dialog: MatDialog,
    public store: OrderStoreService) { }

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
        } else {
          return order[cell];
        }
      default:
        return order[cell];
    }
  }

  openImportDialog() {
    const dialogRef = this.dialog.open(ImportOrdersDialogComponent, {
      width: '250px',
      data: { importResult: this.importResult }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.importResult = result;
      if (result) {
        this.store.addImportedToMainOrders(result);
        this.store.deleteFromExternalOrders(result);
      }
    });
  }

}
