import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { DistrictRoleManagementComponent } from '../district-role-management/district-role-management.component';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { DialogRoleManagementComponent } from '../dialog-role-management/dialog-role-management.component';

@Component({
  selector: 'app-state-role-management',
  templateUrl: './state-role-management.component.html',
  styleUrls: ['./state-role-management.component.css']
})
export class StateRoleManagementComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['name', 'mobileNo', 'email', 'isActive', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userMasterData: any = [];
  userId: number;

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService
  ) {
    this.userId = parseInt(sessionStorage.getItem('userId'));
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.emitterService.isActiveStatusChanged.subscribe(val => {
      if (val) {
        this.getUserMasterDataForState();
      }
    });
  }

  ngOnInit(): void {
    this.getUserMasterDataForState();
  }

  getUserMasterDataForState() {
    this.employeeService.getUserMasterDataForState().subscribe(res => {
      this.userMasterData = res;
   
      let uniquePersonalDetailsData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }



  editUser(user: any) {
    this.dialog.open(DialogRoleManagementComponent, {
      height: '350px',
      width: '1200px',
      data: user,
      disableClose: true
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}
