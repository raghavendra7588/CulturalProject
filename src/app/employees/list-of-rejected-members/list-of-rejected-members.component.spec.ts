import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRejectedMembersComponent } from './list-of-rejected-members.component';

describe('ListOfRejectedMembersComponent', () => {
  let component: ListOfRejectedMembersComponent;
  let fixture: ComponentFixture<ListOfRejectedMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfRejectedMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfRejectedMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
