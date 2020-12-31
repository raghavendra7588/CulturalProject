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
import { DynamicStateApproved } from '../employees.model';

@Component({
  selector: 'app-new-approvals',
  templateUrl: './new-approvals.component.html',
  styleUrls: ['./new-approvals.component.css']
})
export class NewApprovalsComponent implements OnInit {

  displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  personalDetailsData: any = [];
  dataSource: any;
  preferredLanguage: string = 'true';
  role: string;

  isDistrict: boolean;
  userId: number;
  panchayatData: any = [];
  districtId: number;
  districtData: any = [];
  dynamicStateApproved: DynamicStateApproved = new DynamicStateApproved();

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService
  ) {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.userId = Number(sessionStorage.getItem('userId'));
    this.role = sessionStorage.getItem('role');

    if (this.role === 'DISTRICT') {
      this.displayedColumns = ['artistCode', 'fullName', 'place', 'approvalStatus', 'actionTakenBy', 'createdBy', 'view'];
      this.isDistrict = true;
      this.getPersonalDetailsData();
    }
    if (this.role === 'STATE') {
      this.displayedColumns = ['artistCode', 'fullName', 'district', 'place', 'approvalStatus', 'actionTakenBy', 'createdBy', 'view'];
      this.isDistrict = false;
      this.getDistrictMasterData();
      this.getNewProposalFormDetailsAtState();
    }
    if (this.role === 'ADMIN') {
      this.displayedColumns = ['artistCode', 'fullName', 'district', 'place', 'approvalStatus', 'actionTakenBy', 'createdBy', 'view'];
      this.isDistrict = false;
      this.getDistrictMasterData();
      this.getNewProposalFormByAdmin();
    }


    this.emitterService.isApproved.subscribe(val => {
      if (val) {
        if (this.role === 'DISTRICT') {
          this.isDistrict = true;
          this.getPersonalDetailsData();
        }
        if (this.role === 'STATE') {
          this.isDistrict = false;
          this.getNewProposalFormDetailsAtState();
        }
        if (this.role === 'ADMIN') {
          this.isDistrict = false;
          this.getNewProposalFormByAdmin();
        }
      }

    });

  }

  ngOnInit(): void {

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
    this.employeeService.getNewProposalFormData(this.userId).subscribe(res => {
      this.personalDetailsData = res;
      let uniqueData = _.uniqBy(this.personalDetailsData, 'id');
      this.personalDetailsData = uniqueData;
      this.dataSource = new MatTableDataSource(this.personalDetailsData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getNewProposalFormDetailsAtState() {
    this.employeeService.getNewApprovalsByState().subscribe(res => {
      this.personalDetailsData = res;
      let uniqueData = _.uniqBy(this.personalDetailsData, 'id');
      this.personalDetailsData = uniqueData;
      this.dataSource = new MatTableDataSource(this.personalDetailsData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getNewProposalFormByAdmin() {
    this.employeeService.getNewApprovalsDataByAdminUser().subscribe(res => {
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




  searchRecord() {

    this.dynamicStateApproved.roleName = sessionStorage.getItem('role');
    if (this.dynamicStateApproved.districtId === null || this.dynamicStateApproved.districtId === undefined) {
      this.dynamicStateApproved.districtId = 0;
    }
    if (this.dynamicStateApproved.panchayatName === null || this.dynamicStateApproved.panchayatName === undefined || this.dynamicStateApproved.panchayatName === '') {
      this.dynamicStateApproved.panchayatName = 'ALL';

    }


    this.employeeService.postDynamicNewProposalByState(this.dynamicStateApproved).subscribe(res => {
      this.personalDetailsData = res;
      let uniqueApprovedListData = _.uniqBy(this.personalDetailsData, 'id');
      this.personalDetailsData = uniqueApprovedListData;
      this.dataSource = new MatTableDataSource(this.personalDetailsData);
      this.dataSource.paginator = this.paginator;
    });
  }

  searchRecordByAdmin() {
    this.dynamicStateApproved.roleName = sessionStorage.getItem('role');
    if (this.dynamicStateApproved.districtId === null || this.dynamicStateApproved.districtId === undefined) {
      this.dynamicStateApproved.districtId = 0;
    }
    if (this.dynamicStateApproved.panchayatName === null || this.dynamicStateApproved.panchayatName === undefined || this.dynamicStateApproved.panchayatName === '') {
      this.dynamicStateApproved.panchayatName = 'ALL';

    }
    this.employeeService.postDynamicNewApprovalsByAdmin(this.dynamicStateApproved).subscribe(res => {
      this.personalDetailsData = res;
      let uniqueApprovedListData = _.uniqBy(this.personalDetailsData, 'id');
      this.personalDetailsData = uniqueApprovedListData;
      this.dataSource = new MatTableDataSource(this.personalDetailsData);
      this.dataSource.paginator = this.paginator;
    });
  }


  selectedPanchyatFromList(panchayat) {
    this.dynamicStateApproved.panchayatName = panchayat.PanchyatId;
  }


  selectedDistrictFromList(district) {
    this.dynamicStateApproved.districtId = district.DistrictId;
    this.employeeService.getPanchayatBasedOnDistrictId(this.dynamicStateApproved.districtId).subscribe(res => {
      this.panchayatData = res;
    });
    this.dynamicStateApproved.panchayatName = '';

  }

  getDistrictMasterData() {
    this.employeeService.getDistrictMasterData().subscribe(res => {
      this.districtData = res;
    });
  }




}
