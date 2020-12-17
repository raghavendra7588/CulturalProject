import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateRoleManagementComponent } from './state-role-management.component';

describe('StateRoleManagementComponent', () => {
  let component: StateRoleManagementComponent;
  let fixture: ComponentFixture<StateRoleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateRoleManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateRoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
