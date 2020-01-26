
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { OrderItem } from 'src/app/models/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-order-items-table',
  templateUrl: './order-items-table.component.html',
  styleUrls: ['./order-items-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemsTableComponent implements OnInit, OnChanges {
  dataSource: MatTableDataSource<OrderItem>;
  displayedOrderColumns: string[] = ['name', 'option', 'SKU', 'amount', 'selected'];

  @Input() orderItems: OrderItem[];
  @Output() rowClick = new EventEmitter<OrderItem>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  getOrderItemCellValue(orderItem: OrderItem, cell: string) {
    switch (cell) {
      case 'selected':
        return orderItem[cell] ? 'selected' : 'not selected';
      case 'option':
        return orderItem[cell] ? orderItem[cell].text : 'not selected';
      default:
        return orderItem[cell];
    }
  }

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.orderItems;
    }
  }

  onCheckboxChange($event: MatCheckboxChange, orderItem: OrderItem) {
    orderItem.selected = $event.checked;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.orderItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRowClick(orderItem: OrderItem) {
    this.rowClick.emit(orderItem);
  }
}
