import { TestBed } from '@angular/core/testing';

import { BpObserverService } from './bp-observer.service';

describe('BpObserverService', () => {
  let service: BpObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
