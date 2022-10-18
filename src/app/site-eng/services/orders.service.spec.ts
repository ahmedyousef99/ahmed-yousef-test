import { TestBed } from '@angular/core/testing';

import { OrdersSiteEng } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersSiteEng;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersSiteEng);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
