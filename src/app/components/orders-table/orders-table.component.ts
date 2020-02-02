import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, Subscription, merge, of, Subject } from 'rxjs';
import { catchError, startWith, switchMap, map } from 'rxjs/operators';
import { OrderStoreService } from 'src/app/store/order-store.service';
import { observable } from 'mobx';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() displayedOrderColumns: string[];
  @Input() ordersType: 'Main' | 'Importable';
  @Input() pageSizeOptions = [5];
  @Output() rowClick = new EventEmitter<Order>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @observable ordersLength = 0;
  ordersFilter = '';
  subscription = new Subscription();
  dataSource: MatTableDataSource<Order>;
  filtersUpdate = new Subject<any>();

  constructor(public store: OrderStoreService) {
  }

  addPlus(n: number) {
    if (n > 0) {
      return '+' + String(n).padStart(3, '0');
    } else if (n < 0) {
      return '-' + String(-n).padStart(3, '0');
    } else {
      return '000';
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
      case 'created':
        return new Date(order[cell]).toLocaleDateString('en-US', dateOptions);
      case 'amountOfProducts':
        sum = 0;
        order.orderItems.forEach(i => sum += i.amount);
        return sum;
      case 'revenue':
      case 'cost':
      case 'price':
        sum = 0;
        const items = order.orderItems.filter(i => i.selected);
        items.forEach(i => sum += i[cell] * i.amount);
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
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnChanges() {
  }

  ngAfterViewInit() {
    this.subscription.add(this.sort.sortChange.subscribe(() => this.paginator.firstPage()));
    this.subscription.add(this.filtersUpdate.subscribe(() => this.paginator.firstPage()));

    merge(this.sort.sortChange, this.paginator.page, this.filtersUpdate)
      .pipe(
        startWith({}),
        switchMap(() => {
          let sortString;
          if (this.sort.active && this.sort.direction) {
            sortString = (this.sort.direction === 'desc' ? '-' : '') + this.sort.active;
          }
          if (this.ordersType === 'Main') {
            return this.store.getMainOrders(
              this.ordersFilter,
              sortString,
              this.paginator.pageIndex * this.paginator.pageSize,
              this.paginator.pageSize);
          } else {
            return this.store.getImportableOrders(
              this.ordersFilter,
              sortString,
              this.paginator.pageIndex * this.paginator.pageSize,
              this.paginator.pageSize);
          }
        }),
        map(data => {
          this.ordersLength = data.totalCount;
          return data.items;
        }),
        catchError(() => {
          return of([]);
        })
      ).subscribe(
        orders => {
          this.dataSource.data = orders;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.ordersFilter = filterValue.trim().toLowerCase();
    this.filtersUpdate.next();
  }

  onRowClick(order: Order) {
    this.rowClick.emit(order);
  }
}
