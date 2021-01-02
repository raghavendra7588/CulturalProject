import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { DynamicPanchayatName, DynamicStateApproved } from '../employees.model';

@Component({
  selector: 'app-grade-wise-district',
  templateUrl: './grade-wise-district.component.html',
  styleUrls: ['./grade-wise-district.component.css']
})
export class GradeWiseDistrictComponent implements OnInit {
  userId: number;
  currentUserRole: string;
  userMasterData: any = [];
  role: string;
  currentGrade: string;
  dataSource: any;
  displayedColumns: string[] = ['fullName', 'grade', 'district', 'place', 'approvalStatus', 'approvedBy', 'approvedAt', 'view'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  roleName: string;
  districtData: any = [];
  panchayatName: string;

  dynamicStateApproved: DynamicStateApproved = new DynamicStateApproved();
  dynamicPanchayatName: DynamicPanchayatName = new DynamicPanchayatName();
  panchayatData: any;


  constructor(
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public dialog: MatDialog
  ) {


    this.userId = Number(sessionStorage.getItem('userId'));
    this.currentUserRole = sessionStorage.getItem('userManagement');


    this.getDistrictMasterData();
    this.dynamicStateApproved.districtId = Number(sessionStorage.getItem('DistrictId'));
    this.employeeService.getPanchayatBasedOnDistrictId(this.dynamicStateApproved.districtId).subscribe(res => {
      this.panchayatData = res;
    });

    this.emitterService.isUserMasterSelected.subscribe(val => {
      if (val) {
        this.currentUserRole = sessionStorage.getItem('userManagement');
        if (this.currentUserRole === 'DISTRICT_A') {
          this.getGradeAArtistByDistrict();
          this.currentGrade = 'A';
          this.dynamicStateApproved.panchayatName ='';
        }
        if (this.currentUserRole === 'DISTRICT_B') {
          this.getGradeBArtistByDistrict();
          this.currentGrade = 'B';
          this.dynamicStateApproved.panchayatName ='';
        }
        if (this.currentUserRole === 'DISTRICT_C') {
          this.getGradeCArtistByDistrict();
          this.currentGrade = 'C';
          this.dynamicStateApproved.panchayatName ='';
        }
      }
      else {
        return;
      }
    });



    if (this.currentUserRole === 'DISTRICT_A') {
      this.getGradeAArtistByDistrict();
      this.currentGrade = 'A';
      this.dynamicStateApproved.panchayatName ='';
    }
    if (this.currentUserRole === 'DISTRICT_B') {
      this.getGradeBArtistByDistrict();
      this.currentGrade = 'B';
      this.dynamicStateApproved.panchayatName ='';
    }
    if (this.currentUserRole === 'DISTRICT_C') {
      this.getGradeCArtistByDistrict();
      this.currentGrade = 'C';
      this.dynamicStateApproved.panchayatName ='';
    }
  }

  ngOnInit(): void {
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  getGradeAArtistByDistrict() {
    let uniqueData: any = [];
    this.employeeService.getGradeAArtistDataByDistrict(this.userId).subscribe(res => {
      this.userMasterData = res;

      uniqueData = _.uniqBy(this.userMasterData, 'id');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getGradeBArtistByDistrict() {
    let uniqueData: any = [];
    this.employeeService.getGradeBArtistDataByDistrict(this.userId).subscribe(res => {
      this.userMasterData = res;

      uniqueData = _.uniqBy(this.userMasterData, 'id');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }


  getGradeCArtistByDistrict() {
    let uniqueData: any = [];
    this.employeeService.getGradeCArtistDataByDistrict(this.userId).subscribe(res => {
      this.userMasterData = res;

      uniqueData = _.uniqBy(this.userMasterData, 'id');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
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



  searchRecord() {
    this.dynamicStateApproved.roleName = sessionStorage.getItem('role');

    if (this.dynamicStateApproved.districtId === null || this.dynamicStateApproved.districtId === undefined) {
      this.dynamicStateApproved.districtId = 0;
    }
    if (this.dynamicStateApproved.panchayatName === null || this.dynamicStateApproved.panchayatName === undefined || this.dynamicStateApproved.panchayatName === '') {
      this.dynamicStateApproved.panchayatName = 'ALL';

    }
    let uniqueData: any = [];

    if (this.currentUserRole === 'DISTRICT_A') {
      this.employeeService.getArtistCategoryADataByAdmin(this.dynamicStateApproved).subscribe(res => {
        this.userMasterData = res;

        uniqueData = _.uniqBy(this.userMasterData, 'id');
        this.userMasterData = uniqueData;
        this.dataSource = new MatTableDataSource(this.userMasterData);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
    if (this.currentUserRole === 'DISTRICT_B') {
      this.employeeService.getArtistCategoryBDataByAdmin(this.dynamicStateApproved).subscribe(res => {
        this.userMasterData = res;

        uniqueData = _.uniqBy(this.userMasterData, 'id');
        this.userMasterData = uniqueData;
        this.dataSource = new MatTableDataSource(this.userMasterData);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
    if (this.currentUserRole === 'DISTRICT_C') {
      this.employeeService.getArtistCategoryCDataByAdmin(this.dynamicStateApproved).subscribe(res => {
        this.userMasterData = res;

        uniqueData = _.uniqBy(this.userMasterData, 'id');
        this.userMasterData = uniqueData;
        this.dataSource = new MatTableDataSource(this.userMasterData);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
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
}
