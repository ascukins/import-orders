import { Component, Inject, ViewChild } from '@angular/core';
import { OrderStoreService } from 'src/app/store/order-store.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Order } from 'src/app/models/models';

@Component({
  selector: 'app-import-orders-dialog',
  templateUrl: './import-orders-dialog.component.html',
  styleUrls: ['./import-orders-dialog.component.scss']
})
export class ImportOrdersDialogComponent {

  @ViewChild(MatStepper, { static: true }) stepper: MatStepper;
  order: Order;

  constructor(
    public store: OrderStoreService,
    public dialogRef: MatDialogRef<ImportOrdersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onOrderRowClick(order: Order) {
    this.order = order;
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
