import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { DynamicStateApproved } from '../employees.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.css']
})
export class ApprovedListComponent implements OnInit {


  displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  approvedListData: any;
  roleName: string;
  userId: number;
  districtId: number;
  districtData: any = [];
  role: string;
  dynamicStateApproved: DynamicStateApproved = new DynamicStateApproved();
  language: string;
  preferredLanguage: any = [];
  panchayatData: any = [];

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService
  ) {
    this.roleName = sessionStorage.getItem('role');
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.userId = Number(sessionStorage.getItem('userId'));
    if (this.roleName === 'DISTRICT') {
      this.getApprovedListByDistrictData(this.userId);
      this.displayedColumns = ['artistCode', 'fullName', 'place', 'approvalStatus', 'approvedBy', 'approvedByAt', 'view'];

    }
    if (this.roleName === 'STATE') {
      this.displayedColumns = ['artistCode', 'fullName', 'district', 'place', 'approvalStatus', 'approvedBy', 'approvedByAt', 'view'];
      this.getDistrictMasterData();
      this.getApprovedListData();
    }

    if (this.roleName === 'ADMIN') {
      this.displayedColumns = ['artistCode', 'fullName', 'district', 'place', 'approvalStatus', 'approvedBy', 'approvedByAt', 'view'];
      this.getDistrictMasterData();
      this.getApprovedListDataByAdmin();
    }
    if ("role" in sessionStorage) {
      this.role = sessionStorage.getItem('role');
      this.dynamicStateApproved.roleName = this.role;
    }
  }

  ngOnInit(): void {
    this.preferredLanguage = [
      { id: 0, title: 'ENGLISH' },
      { id: 1, title: 'मराठी' }
    ];
  }


  getApprovedListDataByAdmin() {
    this.employeeService.getApprovedListByAdminUser().subscribe(res => {
      this.approvedListData = res;
      let uniqueApprovedListData = _.uniqBy(this.approvedListData, 'id');
      this.approvedListData = uniqueApprovedListData;
      this.dataSource = new MatTableDataSource(this.approvedListData);
      this.dataSource.paginator = this.paginator;
    });
  }

  getApprovedListData() {
    this.employeeService.getApprovedList().subscribe(res => {
      this.approvedListData = res;
      let uniqueApprovedListData = _.uniqBy(this.approvedListData, 'id');
      this.approvedListData = uniqueApprovedListData;
      this.dataSource = new MatTableDataSource(this.approvedListData);
      this.dataSource.paginator = this.paginator;
    });
  }

  getApprovedListByDistrictData(userId: number) {
    this.employeeService.getApprovedListByDistrict(userId).subscribe(res => {
      this.approvedListData = res;
      let uniqueApprovedListData = _.uniqBy(this.approvedListData, 'id');
      this.approvedListData = uniqueApprovedListData;
      this.dataSource = new MatTableDataSource(this.approvedListData);
      this.dataSource.paginator = this.paginator;
    });
  }

  viewEmployee(response) {

    let res: any = [];
    res = response;
    this.dialog.open(DialogViewProposalFormComponent, {
      height: '600px',
      width: '1200px',
      data: res,
      disableClose: false
    });
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
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

  searchRecord() {
    if (this.dynamicStateApproved.districtId === null || this.dynamicStateApproved.districtId === undefined) {
      this.dynamicStateApproved.districtId = 0;
    }
    if (this.dynamicStateApproved.panchayatName === null || this.dynamicStateApproved.panchayatName === undefined || this.dynamicStateApproved.panchayatName === '') {
      this.dynamicStateApproved.panchayatName = 'ALL';

    }

    this.employeeService.postDynamicStateApprovedList(this.dynamicStateApproved).subscribe(res => {
      this.approvedListData = res;
      let uniqueApprovedListData = _.uniqBy(this.approvedListData, 'id');
      this.approvedListData = uniqueApprovedListData;
      this.dataSource = new MatTableDataSource(this.approvedListData);
      this.dataSource.paginator = this.paginator;
    });
  }

  searchRecordByAdmin(){
    if (this.dynamicStateApproved.districtId === null || this.dynamicStateApproved.districtId === undefined) {
      this.dynamicStateApproved.districtId = 0;
    }
    if (this.dynamicStateApproved.panchayatName === null || this.dynamicStateApproved.panchayatName === undefined || this.dynamicStateApproved.panchayatName === '') {
      this.dynamicStateApproved.panchayatName = 'ALL';

    }

    this.employeeService.postDynamicApprovedListByAdmin(this.dynamicStateApproved).subscribe(res => {
      this.approvedListData = res;
      let uniqueApprovedListData = _.uniqBy(this.approvedListData, 'id');
      this.approvedListData = uniqueApprovedListData;
      this.dataSource = new MatTableDataSource(this.approvedListData);
      this.dataSource.paginator = this.paginator;
    });
  }

  districtSelectAll() {
    this.getApprovedListData();
  }

  selectedLanguageFromList(res) {
    if (res.title === 'ENGLISH') {
      sessionStorage.removeItem('language');
      sessionStorage.setItem('language', 'true');
      this.toastr.info('English Language Selected');
    }
    else {
      sessionStorage.removeItem('language');
      sessionStorage.setItem('language', 'false');
      this.emitterService.isLanguageChanged.emit(false);
      this.toastr.info('मराठी भाषा निवडली आहे');
    }
  }

  selectedPanchyatFromList(panchayat) {
    this.dynamicStateApproved.panchayatName = panchayat.PanchyatId;

  }
}
