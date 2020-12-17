import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPersonalDetailComponent } from './dialog-personal-detail.component';

describe('DialogPersonalDetailComponent', () => {
  let component: DialogPersonalDetailComponent;
  let fixture: ComponentFixture<DialogPersonalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPersonalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPersonalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
