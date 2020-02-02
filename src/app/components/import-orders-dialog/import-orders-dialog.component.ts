import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { OrderStoreService } from 'src/app/store/order-store.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Order } from 'src/app/models/models';

@Component({
  selector: 'app-import-orders-dialog',
  templateUrl: './import-orders-dialog.component.html',
  styleUrls: ['./import-orders-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportOrdersDialogComponent {
  @ViewChild(MatStepper, { static: false }) stepper: MatStepper;
  displayedOrderColumns: string[] = ['id', 'customerName', 'amountOfProducts', 'price', 'SKU'];

  constructor(
    public store: OrderStoreService,
    public dialogRef: MatDialogRef<ImportOrdersDialogComponent>
  ) { }

  onOrderRowClick(order: Order) {
    this.store.setSelectedOrder(order);
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
