import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictRoleManagementComponent } from './district-role-management.component';

describe('DistrictRoleManagementComponent', () => {
  let component: DistrictRoleManagementComponent;
  let fixture: ComponentFixture<DistrictRoleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictRoleManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictRoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
