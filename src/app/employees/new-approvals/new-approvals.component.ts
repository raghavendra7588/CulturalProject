import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { DialogPersonalDetailComponent } from '../dialog-personal-detail/dialog-personal-detail.component';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { EmployeesService } from '../employees.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-new-approvals',
  templateUrl: './new-approvals.component.html',
  styleUrls: ['./new-approvals.component.css']
})
export class NewApprovalsComponent implements OnInit {

  displayedColumns: string[] = ['artistCode', 'fullName', 'place', 'view', 'approvalStatus'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  personalDetailsData: any = [];
  dataSource: any;
  preferredLanguage: string = 'true';
  role: string;

  isDistrict: boolean;
  userId: number;

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService
  ) {
    this.userId = Number(sessionStorage.getItem('userId'));
    this.role = sessionStorage.getItem('role');

    if (this.role === 'DISTRICT') {
      this.isDistrict = true;
    }
    else {
      this.isDistrict = false;
    }


    this.emitterService.isApproved.subscribe(val => {
      this.getPersonalDetailsData();
    });

  }

  ngOnInit(): void {


    this.getPersonalDetailsData();

  }

  // createEmployee() {
  //   sessionStorage.removeItem('language');
  //   sessionStorage.setItem('language', 'true');
  //   this.dialog.open(DialogPersonalDetailComponent, {
  //     height: '600px',
  //     width: '1200px',
  //     disableClose: true
  //   });
  // }

  // createEmployeeMarathi() {
  //   sessionStorage.removeItem('language');
  //   sessionStorage.setItem('language', 'false');
  //   this.emitterService.isLanguageChanged.emit(false);
  //   this.dialog.open(DialogPersonalDetailComponent, {
  //     height: '600px',
  //     width: '1200px',
  //     disableClose: true
  //   });
  // }

  editEmployee(employee) {
    this.dialog.open(DialogPersonalDetailComponent, {
      height: '600px',
      width: '1200px',
      data: employee,
      disableClose: true
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

  getPersonalDetailsData() {
    this.employeeService.getNewProposalFormData(this.userId).subscribe(res => {
      this.personalDetailsData = res;
      let uniqueData = _.uniqBy(this.personalDetailsData, 'id');
      this.personalDetailsData = uniqueData;
      this.dataSource = new MatTableDataSource(this.personalDetailsData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  createEmployee() {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.toastr.info('English Language Selected');
  }
  createEmployeeMarathi() {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'false');
    this.emitterService.isLanguageChanged.emit(false);
    this.toastr.info('मराठी भाषा निवडली आहे');
  }
}
