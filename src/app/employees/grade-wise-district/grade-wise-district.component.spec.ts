import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeWiseDistrictComponent } from './grade-wise-district.component';

describe('GradeWiseDistrictComponent', () => {
  let component: GradeWiseDistrictComponent;
  let fixture: ComponentFixture<GradeWiseDistrictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeWiseDistrictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeWiseDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
