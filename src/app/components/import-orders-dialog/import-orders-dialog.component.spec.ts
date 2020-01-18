import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportOrdersDialogComponent } from './import-orders-dialog.component';

describe('ImportOrdersDialogComponent', () => {
  let component: ImportOrdersDialogComponent;
  let fixture: ComponentFixture<ImportOrdersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportOrdersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportOrdersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
