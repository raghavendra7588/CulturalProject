import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqToPutOnHoldComponent } from './req-to-put-on-hold.component';

describe('ReqToPutOnHoldComponent', () => {
  let component: ReqToPutOnHoldComponent;
  let fixture: ComponentFixture<ReqToPutOnHoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqToPutOnHoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqToPutOnHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
