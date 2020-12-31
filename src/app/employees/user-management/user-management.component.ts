import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';

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

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService
  ) {
    this.currentUserRole = sessionStorage.getItem('userManagement');

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

}
