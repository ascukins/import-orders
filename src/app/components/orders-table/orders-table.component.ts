import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/models/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  dataSource: MatTableDataSource<Order>;
  @Input() displayedOrderColumns: string[];
  @Input() orders: Order[];
  @Input() pageSizeOptions = [5];
  @Output() rowClick = new EventEmitter<Order>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {
  }

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

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClick(order: Order) {
    this.rowClick.emit(order);
  }
}
