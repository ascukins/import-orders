import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { Order } from 'src/app/models/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit, OnChanges {
  dataSource: MatTableDataSource<Order>;
  @Input() displayedOrderColumns: string[];
  @Input() orders: Order[];
  @Input() pageSizeOptions = [5];
  @Output() rowClick = new EventEmitter<Order>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {
  }

  addPlus(n: number) {
    if (n > 0) {
      return '+' + n;
    } else {
      return n;
    }
  }
  currencyToString(amount: any) {
    const s = String(amount);
    return s.substring(0, s.length - 2) + '.' + s.substring(s.length - 2);
  }

  getOrderCellValue(order: Order, cell: string) {
    let sum: number;
    let SKUs: string[];
    const dateOptions = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    switch (cell) {
      case 'customer':
        return order.customer.name;
      case 'created':
        return order[cell].toLocaleDateString('en-US', dateOptions);
      case 'amountOfProducts':
        sum = 0;
        order.orderItems.forEach(i => sum += i.amount);
        return sum;
      case 'revenue':
      case 'cost':
      case 'price':
        sum = 0;
        order.orderItems.forEach(i => sum += i[cell] * i.amount);
        return this.currencyToString(this.addPlus(sum));
      case 'SKU':
        SKUs = [];
        order.orderItems.forEach(i => SKUs.push(i.SKU));
        if (SKUs.length > 3) {
          return SKUs.slice(0, 2).join(', ') + `, (+${SKUs.length - 2})`;
        } else {
          return SKUs.join(', ');
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

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.orders;
    }
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
