import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtTypeConsolidatedCountWiseReportComponent } from './art-type-consolidated-count-wise-report.component';

describe('ArtTypeConsolidatedCountWiseReportComponent', () => {
  let component: ArtTypeConsolidatedCountWiseReportComponent;
  let fixture: ComponentFixture<ArtTypeConsolidatedCountWiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtTypeConsolidatedCountWiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtTypeConsolidatedCountWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
