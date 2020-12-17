import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserMasterComponent } from './dialog-add-user-master.component';

describe('DialogAddUserMasterComponent', () => {
  let component: DialogAddUserMasterComponent;
  let fixture: ComponentFixture<DialogAddUserMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddUserMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
