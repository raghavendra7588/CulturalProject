import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogRoleManagementComponent } from '../dialog-role-management/dialog-role-management.component';
import { DynamicStateRoleDistrict } from '../employees.model';

@Component({
  selector: 'app-district-role-management',
  templateUrl: './district-role-management.component.html',
  styleUrls: ['./district-role-management.component.css']
})
export class DistrictRoleManagementComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['name', 'mobileNo', 'districtName', 'isActive', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userMasterData: any = [];

  districtId: number;
  districtData: any = [];
  role: string;


  dynamicStateRoleDistrict: DynamicStateRoleDistrict = new DynamicStateRoleDistrict();

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
        this.getUserMasterDataForDistrict();
      }
    });
  }

  ngOnInit(): void {
    this.getUserMasterDataForDistrict();
    this.getDistrictMasterData();
  }


  getUserMasterDataForDistrict() {
    this.employeeService.getUserMasterDataForDistrict().subscribe(res => {
      this.userMasterData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }



  editUser(user: any) {
    this.dialog.open(DialogRoleManagementComponent, {
      height: '355px',
      width: '1200px',
      data: user,
      disableClose: true
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  selectedDistrictFromList(district) {
    this.dynamicStateRoleDistrict.districtId = district.DistrictId;
  }

  getDistrictMasterData() {
    this.employeeService.getDistrictMasterData().subscribe(res => {
      this.districtData = res;
    });
  }

  searchRecord() {
    this.dynamicStateRoleDistrict.roleName = sessionStorage.getItem('role');
    if (this.dynamicStateRoleDistrict.districtId === null || this.dynamicStateRoleDistrict.districtId === undefined) {
      this.dynamicStateRoleDistrict.districtId = 0;
    }
    
    this.employeeService.postDynamicDistrictDataByState(this.dynamicStateRoleDistrict).subscribe(res => {
      this.userMasterData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

}
