import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { DistrictRoleManagementComponent } from '../district-role-management/district-role-management.component';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { DialogRoleManagementComponent } from '../dialog-role-management/dialog-role-management.component';
import { DynamicStateRolePanchayat } from '../employees.model';

@Component({
  selector: 'app-panchayat-role-management',
  templateUrl: './panchayat-role-management.component.html',
  styleUrls: ['./panchayat-role-management.component.css']
})
export class PanchayatRoleManagementComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['name', 'districtName', 'panchayatName', 'isActive', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userMasterData: any = [];
  dynamicStateRolePanchayat: DynamicStateRolePanchayat = new DynamicStateRolePanchayat();
  districtId: number;
  districtData: any = [];
  panchayatData: any = [];

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService
  ) {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.emitterService.isActiveStatusChanged.subscribe(val => {
      if (val) {
        this.getUserMasterDataForPanchayat();
      }
    });
  }

  ngOnInit(): void {
    this.getUserMasterDataForPanchayat();
    this.getDistrictMasterData();
  }

  getUserMasterDataForPanchayat() {
    this.employeeService.getUserMasterDataForPanchayat().subscribe(res => {
      this.userMasterData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }



  editUser(user: any) {
    this.dialog.open(DialogRoleManagementComponent, {
      height: '400px',
      width: '1200px',
      data: user,
      disableClose: true
    });
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  selectedDistrictFromList(district) {
    this.dynamicStateRolePanchayat.districtId = district.DistrictId;
    this.employeeService.getPanchayatBasedOnDistrictId(this.dynamicStateRolePanchayat.districtId).subscribe(res => {
      this.panchayatData = res;
    });
    this.dynamicStateRolePanchayat.panchayatName = '';

  }

  getDistrictMasterData() {
    this.employeeService.getDistrictMasterData().subscribe(res => {
      this.districtData = res;
    });
  }


  selectedPanchyatFromList(panchayat) {
    this.dynamicStateRolePanchayat.panchayatName = panchayat.PanchyatId;
  }


  searchRecord() {
    if (this.dynamicStateRolePanchayat.districtId === null || this.dynamicStateRolePanchayat.districtId === undefined) {
      this.dynamicStateRolePanchayat.districtId = 0;
    }
    if (this.dynamicStateRolePanchayat.panchayatName === null || this.dynamicStateRolePanchayat.panchayatName === undefined || this.dynamicStateRolePanchayat.panchayatName === '') {
      this.dynamicStateRolePanchayat.panchayatName = 'ALL';

    }

    this.employeeService.postDynamicDistrictDataByPanchayat(this.dynamicStateRolePanchayat).subscribe(res => {
      this.userMasterData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }
}
