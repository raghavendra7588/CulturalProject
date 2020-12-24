import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPersonalDetailsEditComponent } from './dialog-personal-details-edit.component';

describe('DialogPersonalDetailsEditComponent', () => {
  let component: DialogPersonalDetailsEditComponent;
  let fixture: ComponentFixture<DialogPersonalDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPersonalDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPersonalDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
