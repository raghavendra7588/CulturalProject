import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOnHoldComponent } from './list-on-hold.component';

describe('ListOnHoldComponent', () => {
  let component: ListOnHoldComponent;
  let fixture: ComponentFixture<ListOnHoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOnHoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOnHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
