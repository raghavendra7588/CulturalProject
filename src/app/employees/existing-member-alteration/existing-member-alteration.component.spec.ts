import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingMemberAlterationComponent } from './existing-member-alteration.component';

describe('ExistingMemberAlterationComponent', () => {
  let component: ExistingMemberAlterationComponent;
  let fixture: ComponentFixture<ExistingMemberAlterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingMemberAlterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingMemberAlterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
