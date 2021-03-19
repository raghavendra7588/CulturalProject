import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasteWiseConsolidatedReportComponent } from './caste-wise-consolidated-report.component';

describe('CasteWiseConsolidatedReportComponent', () => {
  let component: CasteWiseConsolidatedReportComponent;
  let fixture: ComponentFixture<CasteWiseConsolidatedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasteWiseConsolidatedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasteWiseConsolidatedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
