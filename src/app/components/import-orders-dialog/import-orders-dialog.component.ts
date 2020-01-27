import { Component, Inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { OrderStoreService } from 'src/app/store/order-store.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Order } from 'src/app/models/models';

@Component({
  selector: 'app-import-orders-dialog',
  templateUrl: './import-orders-dialog.component.html',
  styleUrls: ['./import-orders-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportOrdersDialogComponent {
  @ViewChild(MatStepper, { static: true }) stepper: MatStepper;
  displayedOrderColumns: string[] = ['id', 'customer', 'amountOfProducts', 'price', 'SKU'];

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
