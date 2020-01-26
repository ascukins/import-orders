import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobxAngularModule } from 'mobx-angular';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { OrdersComponent } from './components/orders/orders.component';
import { OrderStoreService } from './store/order-store.service';
import { ImportOrdersDialogComponent } from './components/import-orders-dialog/import-orders-dialog.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { OrderItemsTableComponent } from './components/order-items-table/order-items-table.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderDetailsDialogComponent } from './components/order-details-dialog/order-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    ImportOrdersDialogComponent,
    OrdersTableComponent,
    OrderItemsTableComponent,
    OrderDetailsComponent,
    OrderDetailsDialogComponent
  ],
  entryComponents: [
    ImportOrdersDialogComponent,
    OrderDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MobxAngularModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
  ],
  providers: [
    OrderStoreService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, maxWidth: 850, minWidth: '850px' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
