import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeWiseStateComponent } from './grade-wise-state.component';

describe('GradeWiseStateComponent', () => {
  let component: GradeWiseStateComponent;
  let fixture: ComponentFixture<GradeWiseStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeWiseStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeWiseStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
