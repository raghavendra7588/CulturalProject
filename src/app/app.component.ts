import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmitterService } from 'src/app/shared/emitter.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { BasicuserService } from '../app/user/basicuser.service';
import { MatSidenav } from '@angular/material/sidenav';
import { EmployeesService } from './employees/employees.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gov-cultural';
  preferredLanguage: string;
  role: string;
  userName: string;
  welcome: string = 'WELCOME';

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  @ViewChild('drawer', { static: false }) drawer: MatSidenav;
  districtMasterData: any = [];
  districtId: number;
  districtName: string = '';

  constructor(
    public basicUserService: BasicuserService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private emitterService: EmitterService,
    public router: Router,
    public employeeService: EmployeesService
  ) {
    this.userName = sessionStorage.getItem('Name');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    if ("language" in sessionStorage) {
      this.preferredLanguage = sessionStorage.getItem('language');
    }

    if ("districtName" in sessionStorage) {
      this.districtName = sessionStorage.getItem('districtName');

    }
    this.getDistrictMastersData();
    this.emitterService.isLoggedIn.subscribe(val => {

      if (val) {
        if ("Name" in sessionStorage) {
          this.userName = sessionStorage.getItem('Name');
        }
      }



      if ("role" in sessionStorage) {
        this.role = sessionStorage.getItem('role');
        this.districtId = Number(sessionStorage.getItem('DistrictId'));
        if (this.districtId != 0) {
          this.districtMasterData.filter(res => {
            if (this.districtId === Number(res.DistrictId)) {
              this.districtName = res.DistrictName;
              sessionStorage.setItem('districtName', this.districtName);
            }
          })
        }
        else {
          return;
        }
      }

    });

  }



  ngOnInit(): void {
    this.preferredLanguage = 'true';
    sessionStorage.setItem('language', 'true');
    if ("role" in sessionStorage) {
      this.role = sessionStorage.getItem('role');
    }
    this.getData();
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  isEnglish() {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.emitterService.isLanguageChanged.emit(true);
  }
  isMarathi() {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'false');
    this.emitterService.isLanguageChanged.emit(false);
  }

  isLogout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  navigateToPersonalDetails() {
    this.router.navigate(['/details/personalDetails']);
  }

  navigateToPersonalDetailsMarathi() {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'false');
    this.emitterService.isLanguageChanged.emit(false);
    this.router.navigate(['/details/personalDetails']);
  }

  navigateToPersonalDetailsEnglish() {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.emitterService.isLanguageChanged.emit(true);
    this.router.navigate(['/details/personalDetails']);
  }

  changePassword() {

  }

  getData() {
    this.employeeService.getAllData().subscribe(res => {
    });
  }


  getDistrictMastersData() {
    this.employeeService.getDistrictMasterData().subscribe(res => {
      this.districtMasterData = res;
    });
  }




  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
