import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanchayatRoleManagementComponent } from './panchayat-role-management.component';

describe('PanchayatRoleManagementComponent', () => {
  let component: PanchayatRoleManagementComponent;
  let fixture: ComponentFixture<PanchayatRoleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanchayatRoleManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanchayatRoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
