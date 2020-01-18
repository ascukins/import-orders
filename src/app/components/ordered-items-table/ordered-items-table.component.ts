
import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { OrderedItem } from 'src/app/models/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ordered-items-table',
  templateUrl: './ordered-items-table.component.html',
  styleUrls: ['./ordered-items-table.component.scss']
})
export class OrderedItemsTableComponent implements OnInit {
  dataSource: MatTableDataSource<OrderedItem>;
  displayedOrderColumns: string[] = ['name', 'sku', 'selected'];

  @Input() orderedItems: OrderedItem[];
  @Output() rowClick = new EventEmitter<OrderedItem>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  getOrderedItemCellValue(orderedItem: OrderedItem, cell: string) {
    switch (cell) {
      case 'selected':
        return orderedItem[cell] ? 'selected' : 'not selected';
      default:
        return orderedItem[cell];
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.orderedItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRowClick(orderedItem: OrderedItem) {
    this.rowClick.emit(orderedItem);
  }
}
