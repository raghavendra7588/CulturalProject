import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogApprovArtistComponent } from './dialog-approv-artist.component';

describe('DialogApprovArtistComponent', () => {
  let component: DialogApprovArtistComponent;
  let fixture: ComponentFixture<DialogApprovArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogApprovArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogApprovArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
