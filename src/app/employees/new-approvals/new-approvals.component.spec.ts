import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApprovalsComponent } from './new-approvals.component';

describe('NewApprovalsComponent', () => {
  let component: NewApprovalsComponent;
  let fixture: ComponentFixture<NewApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
