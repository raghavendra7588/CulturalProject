import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseAdminReportComponent } from './category-wise-admin-report.component';

describe('CategoryWiseAdminReportComponent', () => {
  let component: CategoryWiseAdminReportComponent;
  let fixture: ComponentFixture<CategoryWiseAdminReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWiseAdminReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseAdminReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
