import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { DynamicPanchayatName, DynamicStateApproved } from '../employees.model';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-grade-wise-state',
  templateUrl: './grade-wise-state.component.html',
  styleUrls: ['./grade-wise-state.component.css']
})
export class GradeWiseStateComponent implements OnInit {
  currentUserRole: string;
  userMasterData: any = [];


  dataSource: any;
  displayedColumns: string[] = ['fullName', 'grade', 'place', 'approvalStatus', 'approvedBy', 'approvedAt', 'view'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentGrade: string;

  roleName: string;
  districtData: any = [];
  panchayatName: string;
  role: string;
  dynamicStateApproved: DynamicStateApproved = new DynamicStateApproved();
  dynamicPanchayatName: DynamicPanchayatName = new DynamicPanchayatName();
  panchayatData: any;

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
        if (this.currentUserRole === 'STATE_A') {
          this.getGradeAArtistByState();
          this.currentGrade = 'A';
        }
        if (this.currentUserRole === 'STATE_B') {
          this.getGradeBArtistByState();
          this.currentGrade = 'B';
        }
        if (this.currentUserRole === 'STATE_C') {
          this.getGradeCArtistByState();
          this.currentGrade = 'C';
        }
      }
      else {
        return;
      }
    });


    if (this.currentUserRole === 'STATE_A') {
      this.getGradeAArtistByState();
      this.currentGrade = 'A';
    }
    if (this.currentUserRole === 'STATE_B') {
      this.getGradeBArtistByState();
      this.currentGrade = 'B';
    }
    if (this.currentUserRole === 'STATE_C') {
      this.getGradeCArtistByState();
      this.currentGrade = 'C';
    }
  }

  ngOnInit(): void {
  }


  getGradeAArtistByState() {
    let uniqueData: any = [];
    this.employeeService.getGradeAArtistByState().subscribe(res => {
      this.userMasterData = res;
      uniqueData = _.uniqBy(this.userMasterData, 'id');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getGradeBArtistByState() {
    let uniqueData: any = [];
    this.employeeService.getGradeBArtistByState().subscribe(res => {
      this.userMasterData = res;
      uniqueData = _.uniqBy(this.userMasterData, 'id');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getGradeCArtistByState() {
    let uniqueData: any = [];
    this.employeeService.getGradeCArtistByState().subscribe(res => {
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

  searchRecord() {
    this.dynamicStateApproved.roleName = sessionStorage.getItem('role');

    if (this.dynamicStateApproved.districtId === null || this.dynamicStateApproved.districtId === undefined) {
      this.dynamicStateApproved.districtId = 0;
    }
    if (this.dynamicStateApproved.panchayatName === null || this.dynamicStateApproved.panchayatName === undefined || this.dynamicStateApproved.panchayatName === '') {
      this.dynamicStateApproved.panchayatName = 'ALL';

    }
    let uniqueData: any = [];

    if (this.currentUserRole === 'STATE_A') {
      this.employeeService.getArtistCategoryADataByState(this.dynamicStateApproved).subscribe(res => {
        this.userMasterData = res;
        uniqueData = _.uniqBy(this.userMasterData, 'id');
        this.userMasterData = uniqueData;
        this.dataSource = new MatTableDataSource(this.userMasterData);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
    if (this.currentUserRole === 'STATE_B') {
      this.employeeService.getArtistCategoryBDataByState(this.dynamicStateApproved).subscribe(res => {
        this.userMasterData = res;
        uniqueData = _.uniqBy(this.userMasterData, 'id');
        this.userMasterData = uniqueData;
        this.dataSource = new MatTableDataSource(this.userMasterData);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
    if (this.currentUserRole === 'STATE_C') {
      this.employeeService.getArtistCategoryCDataByState(this.dynamicStateApproved).subscribe(res => {
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
