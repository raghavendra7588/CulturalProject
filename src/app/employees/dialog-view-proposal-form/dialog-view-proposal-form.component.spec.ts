import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewProposalFormComponent } from './dialog-view-proposal-form.component';

describe('DialogViewProposalFormComponent', () => {
  let component: DialogViewProposalFormComponent;
  let fixture: ComponentFixture<DialogViewProposalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogViewProposalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewProposalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
