import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedItemsTableComponent } from './ordered-items-table.component';

describe('OrderedItemsTableComponent', () => {
  let component: OrderedItemsTableComponent;
  let fixture: ComponentFixture<OrderedItemsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedItemsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
