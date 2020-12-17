import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeAComponent } from './grade-a.component';

describe('GradeAComponent', () => {
  let component: GradeAComponent;
  let fixture: ComponentFixture<GradeAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
