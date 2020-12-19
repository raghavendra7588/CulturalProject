import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EmitterService } from 'src/app/shared/emitter.service';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogPersonalDetailComponent } from '../dialog-personal-detail/dialog-personal-detail.component';
import { DynamicPanchayatName, DynamicStateApproved } from '../employees.model';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';

@Component({
  selector: 'app-list-of-rejected-members',
  templateUrl: './list-of-rejected-members.component.html',
  styleUrls: ['./list-of-rejected-members.component.css']
})
export class ListOfRejectedMembersComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[];
  rejectedMembersData: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userId: number;
  roleName: string;
  districtData: any = [];
  panchayatName: string;
  role: string;
  dynamicStateApproved: DynamicStateApproved = new DynamicStateApproved();
  dynamicPanchayatName: DynamicPanchayatName = new DynamicPanchayatName();
  panchayatData: any;
  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService
  ) {

    this.userId = Number(sessionStorage.getItem('userId'));
    this.roleName = sessionStorage.getItem('role');
    if ("role" in sessionStorage) {
      this.role = sessionStorage.getItem('role');
      this.dynamicStateApproved.roleName = this.role;
    }



    if (this.roleName === 'DISTRICT') {
      this.displayedColumns = ['artistCode', 'fullName', 'place', 'approvalStatus', 'rejectedBy', 'rejectedAt', 'view'];
      this.getRejectedMembersByDistrict(this.userId);
    }
    if (this.roleName === 'GRAMPANCHAYAT') {
      this.displayedColumns = ['artistCode', 'fullName', 'place', 'approvalStatus', 'rejectedBy', 'rejectedAt', 'view'];
      if ("panchayatName" in sessionStorage) {
        this.dynamicPanchayatName.panchayatName = sessionStorage.getItem('panchayatName');
        this.userId = Number(sessionStorage.getItem('userId'));
        this.getRejectedMembersByPanchayat(this.userId);
      }

    }
    if (this.roleName === 'STATE') {
      this.displayedColumns = ['artistCode', 'fullName', 'district', 'place', 'approvalStatus', 'view'];
      this.getDistrictMasterData();
      this.getRejectedMembersByState();
    }
  }

  ngOnInit(): void {

  }


  getRejectedMembersByDistrict(userId) {
    this.employeeService.getListOfRejectedMembersByDistrict(userId).subscribe(res => {
      this.rejectedMembersData = res;
      let uniqueRejectedMembersData = _.uniqBy(this.rejectedMembersData, 'id');
      this.rejectedMembersData = uniqueRejectedMembersData;
      this.dataSource = new MatTableDataSource(this.rejectedMembersData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getRejectedMembersByState() {
    this.employeeService.getListOfRejectedMembersByState().subscribe(res => {
      this.rejectedMembersData = res;
      let uniqueRejectedMembersData = _.uniqBy(this.rejectedMembersData, 'id');
      this.rejectedMembersData = uniqueRejectedMembersData;
      this.dataSource = new MatTableDataSource(this.rejectedMembersData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getRejectedMembersByPanchayat(userId) {
    this.employeeService.getListOfRejectedMembersByPanchyat(userId).subscribe(res => {
      this.rejectedMembersData = res;
      let uniqueRejectedMembersData = _.uniqBy(this.rejectedMembersData, 'id');
      this.rejectedMembersData = uniqueRejectedMembersData;
      this.dataSource = new MatTableDataSource(this.rejectedMembersData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  viewEmployee(res) {
    this.dialog.open(DialogViewProposalFormComponent, {
      height: '600px',
      width: '1200px',
      data: res,
      disableClose: true
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
    console.log(this.dynamicStateApproved);
    if (this.dynamicStateApproved.districtId === null || this.dynamicStateApproved.districtId === undefined) {
      this.dynamicStateApproved.districtId = 0;
    }
    if (this.dynamicStateApproved.panchayatName === null || this.dynamicStateApproved.panchayatName === undefined || this.dynamicStateApproved.panchayatName === '') {
      this.dynamicStateApproved.panchayatName = 'ALL';

    }

    this.employeeService.postDynamicStateRejectedList(this.dynamicStateApproved).subscribe(res => {
      this.rejectedMembersData = res;
      let uniqueRejectedMembersData = _.uniqBy(this.rejectedMembersData, 'id');
      this.rejectedMembersData = uniqueRejectedMembersData;
      this.dataSource = new MatTableDataSource(this.rejectedMembersData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }


  districtSelectAll() {
    this.getRejectedMembersByState();
  }

  selectedPanchyatFromList(res) {
    this.dynamicStateApproved.panchayatName = res.PanchyatId;
  }
}
