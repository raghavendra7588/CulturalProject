import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeWiseAdminComponent } from './grade-wise-admin.component';

describe('GradeWiseAdminComponent', () => {
  let component: GradeWiseAdminComponent;
  let fixture: ComponentFixture<GradeWiseAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeWiseAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeWiseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
