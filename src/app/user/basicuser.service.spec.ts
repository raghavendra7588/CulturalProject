import { TestBed } from '@angular/core/testing';

import { BasicuserService } from './basicuser.service';

describe('BasicuserService', () => {
  let service: BasicuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
