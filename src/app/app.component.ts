import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmitterService } from 'src/app/shared/emitter.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { BasicuserService } from '../app/user/basicuser.service';
import { MatSidenav } from '@angular/material/sidenav';
import { EmployeesService } from './employees/employees.service';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementComponent } from './employees/user-management/user-management.component';

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
  sideBarLanguage: string;

  constructor(
    public basicUserService: BasicuserService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private emitterService: EmitterService,
    public router: Router,
    public employeeService: EmployeesService,
    public dialog: MatDialog
  ) {
    this.userName = sessionStorage.getItem('Name');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    if ("language" in sessionStorage) {
      this.preferredLanguage = sessionStorage.getItem('language');
    }
    if ("sideBarLanguage" in sessionStorage) {
      this.sideBarLanguage = sessionStorage.getItem('sideBarLanguage');
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

    this.emitterService.isSideBarLanguage.subscribe(val => {
      if (val) {
        this.sideBarLanguage = sessionStorage.getItem('sideBarLanguage');
      }
    });

  }



  ngOnInit(): void {
    this.preferredLanguage = 'true';
    sessionStorage.setItem('language', 'true');
    if ("role" in sessionStorage) {
      this.role = sessionStorage.getItem('role');
    }

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
    this.router.navigate(['/changePassword']);
  }



  getDistrictMastersData() {
    this.employeeService.getDistrictMasterData().subscribe(res => {
      this.districtMasterData = res;
    });
  }

  navigateToAdminUserManagement() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'ADMIN');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/userManagement']);
  }

  navigateToStateUserManagement() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/userManagement']);

  }

  navigateToDistrictUserManagement() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/userManagement']);
  }

  navigateToPanchayatUserManagement() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'GRAMPANCHAYAT');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/userManagement']);
  }

  gradeAArtistByAdmin() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'ADMIN_A');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/gradeWiseData/admin']);
  }

  gradeBArtistByAdmin() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'ADMIN_B');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/gradeWiseData/admin']);
  }

  gradeCArtistByAdmin() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'ADMIN_C');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/gradeWiseData/admin']);
  }


  gradeAArtistByState() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_A');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/gradeWiseData/state']);
  }


  gradeBArtistByState() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_B');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/gradeWiseData/state']);
  }

  gradeCArtistByState() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_C');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/gradeWiseData/state']);
  }

  gradeAArtistByDistrict() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_A');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/gradeWiseData/district']);
  }
  gradeBArtistByDistrict() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_B');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/gradeWiseData/district']);
  }
  gradeCArtistByDistrict() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_C');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/gradeWiseData/district']);
  }




  categoryAWisePanchayatReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'GRAMPANCHAYAT_A');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/panchayat/categoryWise/report']);
  }

  categoryBWisePanchayatReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'GRAMPANCHAYAT_B');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/panchayat/categoryWise/report']);
  }

  categoryCWisePanchayatReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'GRAMPANCHAYAT_C');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/panchayat/categoryWise/report']);
  }

  combinePanchayatWiseReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'GRAMPANCHAYAT_ALL');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/panchayat/categoryWise/report']);
  }

  holdedCategoryAWisePanchayatReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'GRAMPANCHAYAT_HOLD_A');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/panchayat/categoryWise/report']);
  }
  holdedCategoryBWisePanchayatReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'GRAMPANCHAYAT_HOLD_B');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/panchayat/categoryWise/report']);
  }
  holdedCategoryCWisePanchayatReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'GRAMPANCHAYAT_HOLD_C');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/panchayat/categoryWise/report']);
  }
  holdedCombinePanchayatWiseReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'GRAMPANCHAYAT_HOLD_ALL');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/panchayat/categoryWise/report']);
  }




  categoryAWiseDistrictReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_A');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/district/categoryWise/report']);
  }

  categoryBWiseDistrictReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_B');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/district/categoryWise/report']);
  }

  categoryCWiseDistrictReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_C');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/district/categoryWise/report']);
  }

  combineDistrictWiseReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_ALL');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/district/categoryWise/report']);
  }



  holdedCategoryAWiseDistrictReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_HOLD_A');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/district/categoryWise/report']);
  }
  holdedCategoryBWiseDistrictReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_HOLD_B');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/district/categoryWise/report']);
  }
  holdedCategoryCWiseDistrictReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_HOLD_C');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/district/categoryWise/report']);
  }
  holdedCombineDistrictWiseReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_HOLD_ALL');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/district/categoryWise/report']);
  }



  categoryAWiseStateReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_A');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/state/categoryWise/report']);
  }
  categoryBWiseStateReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_B');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/state/categoryWise/report']);
  }

  categoryCWiseStateReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_C');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/state/categoryWise/report']);
  }

  combineStateWiseReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_ALL');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/state/categoryWise/report']);
  }

  holdedCategoryAWiseStateReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_HOLD_A');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/state/categoryWise/report']);
  }
  holdedCategoryBWiseStateReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_HOLD_B');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/state/categoryWise/report']);
  }
  holdedCategoryCWiseStateReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_HOLD_C');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/state/categoryWise/report']);
  }

  holdedCombineStateWiseReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_HOLD_ALL');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/state/categoryWise/report']);
  }


  stateCountWiseReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'STATE_COUNT_REPORT');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/consolidatedCount/report']);
  }

  adminCountWiseReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'ADMIN_COUNT_REPORT');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/consolidatedCount/report']);
  }


  districtCountWiseReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'DISTRICT_COUNT_REPORT');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/consolidatedCount/report']);
  }


  panchayatCountWiseReport() {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', 'PANCHAYAT_COUNT_REPORT');
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/consolidatedCount/report']);
  }

  artTypeConsolidatedReport(currentUserText) {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', currentUserText.toString());
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/artTypeConsolidatedCount/report']);
  }

  casteWiseConsolidatedReport(currentUserText) {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', currentUserText.toString());
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/castWiseConsolidatedCount/report']);
  }

  religionWiseConsolidatedReport(currentUserText) {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', currentUserText.toString());
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/religionWiseConsolidatedCount/report']);
  }

  gradeWiseConsolidatedReport(currentUserText) {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', currentUserText.toString());
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/gradeWiseConsolidatedCount/report']);
  }

  rejectedConsolidatedReport(currentUserText) {
    sessionStorage.removeItem('userManagement');
    sessionStorage.setItem('userManagement', currentUserText.toString());
    this.emitterService.isUserMasterSelected.emit(true);
    this.router.navigate(['/rejectedConsolidatedCount/report']);
  }

  changeSideBarLanguageToEnglish() {
    sessionStorage.removeItem('sideBarLanguage');
    sessionStorage.setItem('sideBarLanguage', 'true');
    this.emitterService.isSideBarLanguage.emit(true);
  }
  changeSideBarLanguageToMarati() {
    sessionStorage.removeItem('sideBarLanguage');
    sessionStorage.setItem('sideBarLanguage', 'false');
    this.emitterService.isSideBarLanguage.emit(true);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
