/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderStoreService } from './order-store.service';

describe('Service: OrderStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderStoreService]
    });
  });

  it('should ...', inject([OrderStoreService], (service: OrderStoreService) => {
    expect(service).toBeTruthy();
  }));
});
