import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogAddUserMasterComponent } from '../dialog-add-user-master/dialog-add-user-master.component';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-user-master',
  templateUrl: './add-user-master.component.html',
  styleUrls: ['./add-user-master.component.css']
})
export class AddUserMasterComponent implements OnInit {

  displayedColumns: string[] = ['name', 'districtName', 'panchayat', 'role', 'isActive', 'edit'];
  dataSource: any;
  userMaster: any = [];
  roleId: number;
  userObj: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  role: string;

  constructor(
    public dialog: MatDialog,
    public emitterService: EmitterService,
    public employeeService: EmployeesService) {
    this.roleId = parseInt(sessionStorage.getItem('RoleId'));
    this.role = sessionStorage.getItem('role');
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.emitterService.isUserMasterCreated.subscribe(res => {
      if (res) {

        if (this.role === 'ADMIN') {
          this.getStateUserMasterData();
        }
        if (this.role === 'STATE') {
          this.getUserMasterData(this.roleId);
        }

      }
    });
  }

  ngOnInit(): void {

    if (this.role === 'ADMIN') {
      this.getStateUserMasterData();
    }
    if (this.role === 'STATE') {
      this.getUserMasterData(this.roleId);
    }

  }


  openDialog() {
    this.dialog.open(DialogAddUserMasterComponent, {
      height: '330px',
      width: '1200px',
      disableClose: false
    });
  }

  editUser(user: any) {

    this.userObj = user;
    this.dialog.open(DialogAddUserMasterComponent, {
      height: '330px',
      width: '1200px',
      data: this.userObj,
      disableClose: false
    });
  }

  getUserMasterData(roleId) {
    let uniqueRoleMasterData: any = [];
    this.employeeService.getUserMasterData(roleId).subscribe(res => {
      this.userMaster = res;
      uniqueRoleMasterData = _.uniqBy(this.userMaster, 'UserId');

      this.userMaster = uniqueRoleMasterData;
      this.dataSource = new MatTableDataSource(this.userMaster);
      this.dataSource.paginator = this.paginator;
    });
  }

  getStateUserMasterData() {
    let uniqueRoleMasterData: any = [];
    this.employeeService.getStateUserMaster().subscribe(res => {
      this.userMaster = res;
      uniqueRoleMasterData = _.uniqBy(this.userMaster, 'UserId');

      this.userMaster = uniqueRoleMasterData;
      this.dataSource = new MatTableDataSource(this.userMaster);
      this.dataSource.paginator = this.paginator;
    });
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}
