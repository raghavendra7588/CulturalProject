import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeBComponent } from './grade-b.component';

describe('GradeBComponent', () => {
  let component: GradeBComponent;
  let fixture: ComponentFixture<GradeBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
