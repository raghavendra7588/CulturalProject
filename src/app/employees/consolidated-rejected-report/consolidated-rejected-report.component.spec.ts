import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedRejectedReportComponent } from './consolidated-rejected-report.component';

describe('ConsolidatedRejectedReportComponent', () => {
  let component: ConsolidatedRejectedReportComponent;
  let fixture: ComponentFixture<ConsolidatedRejectedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedRejectedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedRejectedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
