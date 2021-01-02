import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicPanchayatName, DynamicStateApproved } from '../employees.model';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-grade-wise-admin',
  templateUrl: './grade-wise-admin.component.html',
  styleUrls: ['./grade-wise-admin.component.css']
})
export class GradeWiseAdminComponent implements OnInit {

  currentUserRole: string;
  userMasterData: any = [];


  dataSource: any;
  displayedColumns: string[] = ['fullName', 'grade', 'district', 'place', 'approvalStatus', 'approvedBy', 'approvedAt', 'view'];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  roleName: string;
  districtData: any = [];
  panchayatName: string;
  role: string;
  dynamicStateApproved: DynamicStateApproved = new DynamicStateApproved();
  dynamicPanchayatName: DynamicPanchayatName = new DynamicPanchayatName();
  panchayatData: any;
  currentGrade: string;

  constructor(
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public dialog: MatDialog
  ) {
    this.currentUserRole = sessionStorage.getItem('userManagement');
    this.getDistrictMasterData();
    this.emitterService.isUserMasterSelected.subscribe(val => {
      if (val) {
        this.currentUserRole = sessionStorage.getItem('userManagement');
        if (this.currentUserRole === 'ADMIN_A') {
          this.getGradeAArtistByAdmin();
          this.currentGrade = 'A';
        }
        if (this.currentUserRole === 'ADMIN_B') {
          this.getGradeBArtistByAdminUser();
          this.currentGrade = 'B';
        }
        if (this.currentUserRole === 'ADMIN_C') {
          this.getGradeCArtistByAdmin();
          this.currentGrade = 'C';
        }
      }
      else {
        return;
      }
    });


    if (this.currentUserRole === 'ADMIN_A') {
      this.getGradeAArtistByAdmin();
      this.currentGrade = 'A';
    }
    if (this.currentUserRole === 'ADMIN_B') {
      this.getGradeBArtistByAdminUser();
      this.currentGrade = 'B';
    }
    if (this.currentUserRole === 'ADMIN_C') {
      this.getGradeCArtistByAdmin();
      this.currentGrade = 'C';
    }

  }

  ngOnInit(): void {
  }
  getGradeAArtistByAdmin() {
    let uniqueData: any = [];
    this.employeeService.getGradeAArtistByAdmin().subscribe(res => {
      this.userMasterData = res;

      uniqueData = _.uniqBy(this.userMasterData, 'id');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }
  getGradeBArtistByAdminUser() {
    let uniqueData: any = [];
    this.employeeService.getGradeBArtistByAdmin().subscribe(res => {
      this.userMasterData = res;

      uniqueData = _.uniqBy(this.userMasterData, 'id');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getGradeCArtistByAdmin() {
    let uniqueData: any = [];
    this.employeeService.getGradeCArtistByAdmin().subscribe(res => {
      this.userMasterData = res;

      uniqueData = _.uniqBy(this.userMasterData, 'id');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
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
  selectedPanchyatFromList(res) {
    this.dynamicStateApproved.panchayatName = res.PanchyatId;
  }

  searchRecord() {
    this.dynamicStateApproved.roleName = sessionStorage.getItem('role');

    if (this.dynamicStateApproved.districtId === null || this.dynamicStateApproved.districtId === undefined) {
      this.dynamicStateApproved.districtId = 0;
    }
    if (this.dynamicStateApproved.panchayatName === null || this.dynamicStateApproved.panchayatName === undefined || this.dynamicStateApproved.panchayatName === '') {
      this.dynamicStateApproved.panchayatName = 'ALL';

    }
    let uniqueData: any = [];

    if (this.currentUserRole === 'ADMIN_A') {
      this.employeeService.getArtistCategoryADataByAdmin(this.dynamicStateApproved).subscribe(res => {
        this.userMasterData = res;
        uniqueData = _.uniqBy(this.userMasterData, 'UserId');
        this.userMasterData = uniqueData;
        this.dataSource = new MatTableDataSource(this.userMasterData);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
    if (this.currentUserRole === 'ADMIN_B') {
      this.employeeService.getArtistCategoryBDataByAdmin(this.dynamicStateApproved).subscribe(res => {
        this.userMasterData = res;
        uniqueData = _.uniqBy(this.userMasterData, 'UserId');
        this.userMasterData = uniqueData;
        this.dataSource = new MatTableDataSource(this.userMasterData);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
    if (this.currentUserRole === 'ADMIN_C') {
      this.employeeService.getArtistCategoryCDataByAdmin(this.dynamicStateApproved).subscribe(res => {
        this.userMasterData = res;
        uniqueData = _.uniqBy(this.userMasterData, 'UserId');
        this.userMasterData = uniqueData;
        this.dataSource = new MatTableDataSource(this.userMasterData);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
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


}
