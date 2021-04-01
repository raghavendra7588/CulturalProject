import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogPersonalDetailComponent } from '../dialog-personal-detail/dialog-personal-detail.component';
import { EmployeesService } from '../employees.service';
import { MatPaginator } from '@angular/material/paginator';
import { BasicuserService } from '../../../app/user/basicuser.service';
import * as _ from 'lodash';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['artistCode', 'fullName', 'place', 'approvalStatus', 'actionTakenBy', 'createdDate', 'view'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  personalDetailsData: any = [];

  preferredLanguage: string = 'true';

  isDistrict: boolean;

  role: string;
  userId: number;


  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {

    this.role = sessionStorage.getItem('role');

    if (this.role === 'DISTRICT') {
      this.isDistrict = true;
    }
    if (this.role === 'ADMIN') {
      this.getNewProposalFormByAdmin();
    }
    else {
      this.isDistrict = false;
    }

    this.emitterService.isPersonalDataCreated.subscribe(value => {
      if (value) {
        if (this.role === 'ADMIN') {
          this.getNewProposalFormByAdmin();
        }
        else {
          this.getPersonalDetailsData();
          this.dataSource.paginator = this.paginator;
        }
      }
    });

    this.emitterService.isLanguageChanged.subscribe(val => {
      this.preferredLanguage = sessionStorage.getItem('language');
    });
  }

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('userId'));
    if (this.role === 'ADMIN') {
      this.getNewProposalFormByAdmin();
    }
    else {
      this.getPersonalDetailsData();
    }

  }

  createEmployee() {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.toastr.info('English Language Selected');
    this.dialog.open(DialogPersonalDetailComponent, {
      height: '600px',
      width: '1200px',
      disableClose: true
    });
  }
  createEmployeeMarathi() {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'false');
    this.toastr.info('मराठी भाषा निवडली आहे');
    this.emitterService.isLanguageChanged.emit(false);
    this.dialog.open(DialogPersonalDetailComponent, {
      height: '600px',
      width: '1200px',
      disableClose: true
    });
  }

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
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getAllPersonalDetailsData(this.userId).subscribe(res => {
      this.personalDetailsData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.personalDetailsData, 'id');
      this.personalDetailsData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.personalDetailsData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getNewProposalFormByAdmin() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getNewApprovalsDataByAdminUser().subscribe(res => {
      this.personalDetailsData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.personalDetailsData, 'id');
      this.personalDetailsData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.personalDetailsData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

}
