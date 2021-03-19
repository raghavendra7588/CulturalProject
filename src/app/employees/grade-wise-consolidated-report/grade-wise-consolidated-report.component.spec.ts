import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeWiseConsolidatedReportComponent } from './grade-wise-consolidated-report.component';

describe('GradeWiseConsolidatedReportComponent', () => {
  let component: GradeWiseConsolidatedReportComponent;
  let fixture: ComponentFixture<GradeWiseConsolidatedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeWiseConsolidatedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeWiseConsolidatedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
