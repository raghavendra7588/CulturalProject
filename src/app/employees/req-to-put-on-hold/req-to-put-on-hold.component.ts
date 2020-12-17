import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-req-to-put-on-hold',
  templateUrl: './req-to-put-on-hold.component.html',
  styleUrls: ['./req-to-put-on-hold.component.css']
})
export class ReqToPutOnHoldComponent implements OnInit {

  role: string;
  userId: number;
  // displayedColumns: string[] = ['artistCode', 'firstName', 'lastName', 'view', 'approvalStatus'];
  displayedColumns: string[] = ['artistCode', 'fullName', 'place','view', 'approvalStatus'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  putOnHoldData: any = [];


  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService
  ) {

    this.role = sessionStorage.getItem('role');
    this.userId = Number(sessionStorage.getItem('userId'));

    this.emitterService.isApproved.subscribe(val => {
      if (val) {
        if (this.role === 'DISTRICT') {
          this.getRequestToPutOnHoldDataByDistrict(this.userId);
        }
        else {
          this.getRequestToPutOnHoldDataByPanchayat(this.userId);
        }
      }

    });




  }

  ngOnInit(): void {
    if (this.role === 'DISTRICT') {
      this.getRequestToPutOnHoldDataByDistrict(this.userId);
    }
    else {
      this.getRequestToPutOnHoldDataByPanchayat(this.userId);
    }

  }


  getRequestToPutOnHoldDataByDistrict(userId) {
    this.employeeService.getReqToPutOnHoldAtDistrict(userId).subscribe(res => {
      console.log(res);
      this.putOnHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.putOnHoldData, 'id');
      this.putOnHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.putOnHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }



  getRequestToPutOnHoldDataByPanchayat(userId) {
    this.employeeService.getReqToPutOnHoldAtPanchayat(userId).subscribe(res => {
      console.log(res);
      this.putOnHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.putOnHoldData, 'id');
      this.putOnHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.putOnHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  viewEmployee(employee) {

    this.dialog.open(DialogViewProposalFormComponent, {
      height: '600px',
      width: '1200px',
      data: employee,
      disableClose: true
    });

  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

}
