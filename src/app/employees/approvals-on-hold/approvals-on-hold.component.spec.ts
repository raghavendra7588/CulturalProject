import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsOnHoldComponent } from './approvals-on-hold.component';

describe('ApprovalsOnHoldComponent', () => {
  let component: ApprovalsOnHoldComponent;
  let fixture: ComponentFixture<ApprovalsOnHoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalsOnHoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsOnHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
