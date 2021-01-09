import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWisePanchayatReportComponent } from './category-wise-panchayat-report.component';

describe('CategoryWisePanchayatReportComponent', () => {
  let component: CategoryWisePanchayatReportComponent;
  let fixture: ComponentFixture<CategoryWisePanchayatReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWisePanchayatReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWisePanchayatReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
