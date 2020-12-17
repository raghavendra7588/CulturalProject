import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRoleManagementComponent } from './dialog-role-management.component';

describe('DialogRoleManagementComponent', () => {
  let component: DialogRoleManagementComponent;
  let fixture: ComponentFixture<DialogRoleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRoleManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
