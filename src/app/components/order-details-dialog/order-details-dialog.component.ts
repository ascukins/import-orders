import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsDialogComponent {

  constructor(public dialogRef: MatDialogRef<OrderDetailsDialogComponent>) { }

  onCancelClick() {
    this.dialogRef.close();
  }

}

