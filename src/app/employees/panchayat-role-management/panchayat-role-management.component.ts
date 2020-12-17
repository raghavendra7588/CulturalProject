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

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService
  ) {

    this.emitterService.isActiveStatusChanged.subscribe(val => {
      if (val) {
        this.getUserMasterDataForPanchayat();
      }
    });
  }

  ngOnInit(): void {
    this.getUserMasterDataForPanchayat();
  }

  getUserMasterDataForPanchayat() {
    this.employeeService.getUserMasterDataForPanchayat().subscribe(res => {
      this.userMasterData = res;
      console.log('user master', this.userMasterData);
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
}
