import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';

@Component({
  selector: 'app-req-to-remove-from-hold',
  templateUrl: './req-to-remove-from-hold.component.html',
  styleUrls: ['./req-to-remove-from-hold.component.css']
})
export class ReqToRemoveFromHoldComponent implements OnInit {


  dataSource: any;
  displayedColumns: string[] = ['artistCode', 'firstName', 'lastName', 'view', 'approvalStatus'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  reqToRemoveFromHoldData: any = [];


  role: string;
  userId: number;

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService
  ) {

    this.role = sessionStorage.getItem('role');
    this.userId = Number(sessionStorage.getItem('userId'));


    if (this.role === 'DISTRICT') {
      this.getReqToPutOnHoldAtDistrict(this.userId);
    }
    if (this.role === 'GRAMPANCHAYAT') {
      this.getReqToPutOnHoldAtPanchayat(this.userId);
    }


    this.emitterService.isApproved.subscribe(val => {
      if (val) {
        if (this.role === 'DISTRICT') {
          this.getReqToPutOnHoldAtDistrict(this.userId);
        }
        if (this.role === 'GRAMPANCHAYAT') {
          this.getReqToPutOnHoldAtPanchayat(this.userId);
        }
      }
    });

  }

  ngOnInit(): void {
  }


  getReqToPutOnHoldAtDistrict(userId) {
    this.employeeService.getReqToHoldAtDistrict(userId).subscribe(res => {
      this.reqToRemoveFromHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.reqToRemoveFromHoldData, 'id');
      this.reqToRemoveFromHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.reqToRemoveFromHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);

    });
  }

  getReqToPutOnHoldAtPanchayat(userId) {
    this.employeeService.getReqToHoldAtPanchayat(userId).subscribe(res => {
      this.reqToRemoveFromHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.reqToRemoveFromHoldData, 'id');
      this.reqToRemoveFromHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.reqToRemoveFromHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);

    });
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  viewEmployee(employee) {
    this.dialog.open(DialogViewProposalFormComponent, {
      height: '600px',
      width: '1200px',
      data: employee,
      disableClose: true
    });
  }

}
