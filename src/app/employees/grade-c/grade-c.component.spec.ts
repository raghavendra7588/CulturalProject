import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeCComponent } from './grade-c.component';

describe('GradeCComponent', () => {
  let component: GradeCComponent;
  let fixture: ComponentFixture<GradeCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
