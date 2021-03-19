import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionWiseConsolidatedReportComponent } from './religion-wise-consolidated-report.component';

describe('ReligionWiseConsolidatedReportComponent', () => {
  let component: ReligionWiseConsolidatedReportComponent;
  let fixture: ComponentFixture<ReligionWiseConsolidatedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionWiseConsolidatedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionWiseConsolidatedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
