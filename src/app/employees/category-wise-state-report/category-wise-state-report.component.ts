import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { DynamicPanchayatName, DynamicStateApproved } from '../employees.model';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-category-wise-state-report',
  templateUrl: './category-wise-state-report.component.html',
  styleUrls: ['./category-wise-state-report.component.css']
})
export class CategoryWiseStateReportComponent implements OnInit {


  currentUserRole: string;
  categoryWiseMasterData: any = [];


  dataSource: any;
  displayedColumns: string[] = ['fullName', 'grade', 'place', 'approvalStatus', 'approvedBy', 'approvedAt'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentGrade: string;

  roleName: string;
  districtData: any = [];
  panchayatName: string;
  role: string;
  dynamicStateApproved: DynamicStateApproved = new DynamicStateApproved();
  dynamicPanchayatName: DynamicPanchayatName = new DynamicPanchayatName();
  panchayatData: any;
  userId: number;
  userMasterSubscription: Subscription;

  constructor(
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService
  ) {

    this.userId = parseInt(sessionStorage.getItem('userId'));
    this.currentUserRole = sessionStorage.getItem('userManagement');
    // this.getDistrictMasterData();
    this.userMasterSubscription = this.emitterService.isUserMasterSelected.subscribe(val => {
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
        if (this.currentUserRole === 'STATE_ALL') {
          this.getAllGradeArtistByState();
          this.currentGrade = 'ALL';
        }


        if (this.currentUserRole === 'STATE_HOLD_A') {
          // this.getHoldedGradeAArtistByDistrict();
          this.currentGrade = 'A';
        }
        if (this.currentUserRole === 'STATE_HOLD_B') {
          // this.getHoldedGradeBArtistByDistrict();
          this.currentGrade = 'B';
        }
        if (this.currentUserRole === 'STATE_HOLD_C') {
          // this.getHoldedGradeCArtistByDistrict();
          this.currentGrade = 'C';
        }
        if (this.currentUserRole === 'DISTRICT_HOLD_ALL') {
          //  this.getHoldedGradeAllArtistByDistrict();
          this.currentGrade = 'ALL';
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
    if (this.currentUserRole === 'STATE_ALL') {
      this.getAllGradeArtistByState();
      this.currentGrade = 'ALL';
    }

    if (this.currentUserRole === 'DISTRICT_HOLD_A') {
      //this.getHoldedGradeAArtistByDistrict();
      this.currentGrade = 'A';
    }
    if (this.currentUserRole === 'DISTRICT_HOLD_B') {
      // this.getHoldedGradeBArtistByDistrict();
      this.currentGrade = 'B';
    }
    if (this.currentUserRole === 'DISTRICT_HOLD_C') {
      this.getGradeCArtistByState();
      this.currentGrade = 'C';
    }
    if (this.currentUserRole === 'DISTRICT_HOLD_ALL') {
      //this.getHoldedGradeAllArtistByDistrict();
      this.currentGrade = 'ALL';
    }
  }

  ngOnInit(): void {
  }


  getGradeAArtistByState() {
    let uniqueData: any = [];
    this.employeeService.getGradeAArtistByState().subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getGradeBArtistByState() {
    let uniqueData: any = [];
    this.employeeService.getGradeBArtistByState().subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getGradeCArtistByState() {
    let uniqueData: any = [];
    this.employeeService.getGradeCArtistByState().subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getAllGradeArtistByState() {
    let uniqueData: any = [];
    this.employeeService.getAllGradeDataByState().subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}
