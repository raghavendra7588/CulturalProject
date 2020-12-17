import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAndHoldDistrictComponent } from './edit-and-hold-district.component';

describe('EditAndHoldDistrictComponent', () => {
  let component: EditAndHoldDistrictComponent;
  let fixture: ComponentFixture<EditAndHoldDistrictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAndHoldDistrictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAndHoldDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
