import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedListPanchayatComponent } from './approved-list-panchayat.component';

describe('ApprovedListPanchayatComponent', () => {
  let component: ApprovedListPanchayatComponent;
  let fixture: ComponentFixture<ApprovedListPanchayatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedListPanchayatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedListPanchayatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
