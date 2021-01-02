import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { DynamicOnHoldArtistByState, DynamicStateRoleDistrict } from '../employees.model';
import { DialogAddUserMasterComponent } from '../dialog-add-user-master/dialog-add-user-master.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  currentUserRole: string;
  userMasterData: any = [];

  dataSource: any;
  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  districtId: number;
  districtData: any = [];
  role: string;
  panchayatData: any = [];
  dynamicStateRoleDistrict: DynamicStateRoleDistrict = new DynamicStateRoleDistrict();
  dynamicOnHoldArtistByState: DynamicOnHoldArtistByState = new DynamicOnHoldArtistByState();

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService
  ) {
    this.currentUserRole = sessionStorage.getItem('userManagement');
    this.getDistrictMasterData();
    this.emitterService.isUserMasterSelected.subscribe(val => {
      if (val) {
        this.currentUserRole = sessionStorage.getItem('userManagement');
        if (this.currentUserRole === 'ADMIN') {
          this.displayedColumns = ['name', 'role', 'MobileNumber', 'isActive', 'view'];
          this.getAdminUserData();
        }
        if (this.currentUserRole === 'STATE') {
          this.displayedColumns = ['name', 'role', 'MobileNumber', 'isActive', 'view'];
          this.getStateUserData();
        }
        if (this.currentUserRole === 'DISTRICT') {
          this.displayedColumns = ['name', 'role', 'district', 'isActive', 'view'];
          this.getDistrictUserData();
        }
        if (this.currentUserRole === 'GRAMPANCHAYAT') {
          this.displayedColumns = ['name', 'role', 'district', 'place', 'isActive', 'view'];
          this.getPanchayatUserData();

        }
      }
      else {
        return;
      }
    });


    if (this.currentUserRole === 'ADMIN') {
      this.displayedColumns = ['name', 'role', 'MobileNumber', 'isActive', 'view'];
      this.getAdminUserData();
    }
    if (this.currentUserRole === 'STATE') {
      this.displayedColumns = ['name', 'role', 'MobileNumber', 'isActive', 'view'];
      this.getStateUserData();
    }
    if (this.currentUserRole === 'DISTRICT') {
      this.displayedColumns = ['name', 'role', 'district', 'isActive', 'view'];
      this.getDistrictUserData();
    }
    if (this.currentUserRole === 'GRAMPANCHAYAT') {
      this.displayedColumns = ['name', 'role', 'district', 'place', 'isActive', 'view'];
      this.getPanchayatUserData();
    }
  }

  ngOnInit(): void {
  }

  getAdminUserData() {
    let uniqueData: any = [];
    this.employeeService.getAdminUserByAdmin().subscribe(res => {
      this.userMasterData = res;

      uniqueData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getStateUserData() {
    let uniqueData: any = [];
    this.employeeService.getStatedByAdmin().subscribe(res => {
      this.userMasterData = res;

      uniqueData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getDistrictUserData() {
    let uniqueData: any = [];
    this.employeeService.getDistrictAdmin().subscribe(res => {
      this.userMasterData = res;

      uniqueData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getPanchayatUserData() {
    let uniqueData: any = [];
    this.employeeService.getPanchayatByAdmin().subscribe(res => {
      this.userMasterData = res;

      let uniqueData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  viewUser() {

  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  searchRecord() {
    this.dynamicStateRoleDistrict.roleName = sessionStorage.getItem('role');
    if (this.dynamicStateRoleDistrict.districtId === null || this.dynamicStateRoleDistrict.districtId === undefined) {
      this.dynamicStateRoleDistrict.districtId = 0;
    }

    this.employeeService.postDynamicDistrictUsersByAdmin(this.dynamicStateRoleDistrict).subscribe(res => {
      this.userMasterData = res;
      let uniqueData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }
  searchRecordForPanchayat() {
    if (this.dynamicOnHoldArtistByState.DistrictId === null || this.dynamicOnHoldArtistByState.DistrictId === undefined) {
      this.dynamicOnHoldArtistByState.DistrictId = 0;
    }
    if (this.dynamicOnHoldArtistByState.panchayatName === null || this.dynamicOnHoldArtistByState.panchayatName === undefined || this.dynamicOnHoldArtistByState.panchayatName === '') {
      this.dynamicOnHoldArtistByState.panchayatName = 'ALL';
    }

    this.dynamicOnHoldArtistByState.RoleName = sessionStorage.getItem('role');


    this.employeeService.postDynamicPanchayatUsersByAdmin(this.dynamicOnHoldArtistByState).subscribe(res => {
      this.userMasterData = res;
      let uniqueData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  selectedPanchyatFromList(res) {
    this.dynamicOnHoldArtistByState.panchayatName = res.PanchyatId;
  }
  selectedDistrictFromList(district) {
    this.dynamicOnHoldArtistByState.DistrictId = district.DistrictId;
    this.employeeService.getPanchayatBasedOnDistrictId(this.dynamicOnHoldArtistByState.DistrictId).subscribe(res => {
      this.panchayatData = res;
    });
    this.dynamicOnHoldArtistByState.panchayatName = '';
  }

  getDistrictMasterData() {
    this.employeeService.getDistrictMasterData().subscribe(res => {
      this.districtData = res;
    });
  }

  viewArtist(artist) {
    sessionStorage.removeItem('viewAction');
    sessionStorage.setItem('viewAction', 'view');
    this.dialog.open(DialogAddUserMasterComponent, {
      height: '330px',
      width: '1000px',
      disableClose: true,
      data: artist
    });
  }
}
