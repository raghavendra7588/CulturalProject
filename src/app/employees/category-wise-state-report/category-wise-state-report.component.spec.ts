import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseStateReportComponent } from './category-wise-state-report.component';

describe('CategoryWiseStateReportComponent', () => {
  let component: CategoryWiseStateReportComponent;
  let fixture: ComponentFixture<CategoryWiseStateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWiseStateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseStateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
