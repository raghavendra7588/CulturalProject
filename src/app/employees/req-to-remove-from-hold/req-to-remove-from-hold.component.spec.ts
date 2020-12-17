import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqToRemoveFromHoldComponent } from './req-to-remove-from-hold.component';

describe('ReqToRemoveFromHoldComponent', () => {
  let component: ReqToRemoveFromHoldComponent;
  let fixture: ComponentFixture<ReqToRemoveFromHoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqToRemoveFromHoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqToRemoveFromHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
