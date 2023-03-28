import { TestBed } from '@angular/core/testing';

import { ScreenBreakService } from './screen-break.service';

describe('ScreenBreakService', () => {
  let service: ScreenBreakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenBreakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
