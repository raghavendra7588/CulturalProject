import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseDistrictReportComponent } from './category-wise-district-report.component';

describe('CategoryWiseDistrictReportComponent', () => {
  let component: CategoryWiseDistrictReportComponent;
  let fixture: ComponentFixture<CategoryWiseDistrictReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWiseDistrictReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseDistrictReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
