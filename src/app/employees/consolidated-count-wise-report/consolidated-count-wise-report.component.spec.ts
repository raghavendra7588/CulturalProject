import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedCountWiseReportComponent } from './consolidated-count-wise-report.component';

describe('ConsolidatedCountWiseReportComponent', () => {
  let component: ConsolidatedCountWiseReportComponent;
  let fixture: ComponentFixture<ConsolidatedCountWiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedCountWiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedCountWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
