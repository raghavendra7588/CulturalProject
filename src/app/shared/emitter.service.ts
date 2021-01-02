import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  public isPersonalDataCreated: EventEmitter<boolean>;
  public isLanguageChanged: EventEmitter<boolean>;
  public isUserMasterCreated: EventEmitter<boolean>;
  public isLoggedIn: EventEmitter<boolean>;
  public isApproved: EventEmitter<boolean>;
  public isPanchyatArtistPuttedOnHold: EventEmitter<boolean>;
  public isActiveStatusChanged: EventEmitter<boolean>;
  public isFileDeleted: EventEmitter<boolean>;
  public isUserMasterSelected: EventEmitter<boolean>;


  constructor() {
    this.isPersonalDataCreated = new EventEmitter();
    this.isLanguageChanged = new EventEmitter();
    this.isUserMasterCreated = new EventEmitter();
    this.isLoggedIn = new EventEmitter();
    this.isApproved = new EventEmitter();
    this.isPanchyatArtistPuttedOnHold = new EventEmitter();
    this.isActiveStatusChanged = new EventEmitter();
    this.isFileDeleted = new EventEmitter();
    this.isUserMasterSelected = new EventEmitter();
  }
}
