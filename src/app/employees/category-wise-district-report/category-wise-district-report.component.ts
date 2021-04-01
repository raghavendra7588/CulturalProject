import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { DynamicPanchayatName, DynamicStateApproved } from '../employees.model';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category-wise-district-report',
  templateUrl: './category-wise-district-report.component.html',
  styleUrls: ['./category-wise-district-report.component.css']
})
export class CategoryWiseDistrictReportComponent implements OnInit, OnDestroy {


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
    public basicuserService: BasicuserService,
    private spinner: NgxSpinnerService
  ) {
    this.userId = parseInt(sessionStorage.getItem('userId'));
    this.currentUserRole = sessionStorage.getItem('userManagement');
    // this.getDistrictMasterData();
    this.userMasterSubscription = this.emitterService.isUserMasterSelected.subscribe(val => {
      if (val) {
        this.currentUserRole = sessionStorage.getItem('userManagement');
        if (this.currentUserRole === 'DISTRICT_A') {
          this.getGradeAArtistByDistrict();
          this.currentGrade = 'A';
        }
        if (this.currentUserRole === 'DISTRICT_B') {
          this.getGradeBArtistByDistrict();
          this.currentGrade = 'B';
        }
        if (this.currentUserRole === 'DISTRICT_C') {
          this.getGradeCArtistByDistrict();
          this.currentGrade = 'C';
        }
        if (this.currentUserRole === 'DISTRICT_ALL') {
          this.getGradeAllArtistByDistrict();
          this.currentGrade = 'ALL';
        }


        if (this.currentUserRole === 'DISTRICT_HOLD_A') {
          this.getHoldedGradeAArtistByDistrict();
          this.currentGrade = 'A';
        }
        if (this.currentUserRole === 'DISTRICT_HOLD_B') {
          this.getHoldedGradeBArtistByDistrict();
          this.currentGrade = 'B';
        }
        if (this.currentUserRole === 'DISTRICT_HOLD_C') {
          this.getHoldedGradeCArtistByDistrict();
          this.currentGrade = 'C';
        }
        if (this.currentUserRole === 'DISTRICT_HOLD_ALL') {
          this.getHoldedGradeAllArtistByDistrict();
          this.currentGrade = 'ALL';
        }
      }
      else {
        return;
      }
    });


    if (this.currentUserRole === 'DISTRICT_A') {
      this.getGradeAArtistByDistrict();
      this.currentGrade = 'A';
    }
    if (this.currentUserRole === 'DISTRICT_B') {
      this.getGradeBArtistByDistrict();
      this.currentGrade = 'B';
    }
    if (this.currentUserRole === 'DISTRICT_C') {
      this.getGradeCArtistByDistrict();
      this.currentGrade = 'C';
    }
    if (this.currentUserRole === 'DISTRICT_ALL') {
      this.getGradeAllArtistByDistrict();
      this.currentGrade = 'ALL';
    }

    if (this.currentUserRole === 'DISTRICT_HOLD_A') {
      this.getHoldedGradeAArtistByDistrict();
      this.currentGrade = 'A';
    }
    if (this.currentUserRole === 'DISTRICT_HOLD_B') {
      this.getHoldedGradeBArtistByDistrict();
      this.currentGrade = 'B';
    }
    if (this.currentUserRole === 'DISTRICT_HOLD_C') {
      this.getHoldedGradeCArtistByDistrict();
      this.currentGrade = 'C';
    }
    if (this.currentUserRole === 'DISTRICT_HOLD_ALL') {
      this.getHoldedGradeAllArtistByDistrict();
      this.currentGrade = 'ALL';
    }
  }

  ngOnInit(): void {
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  getGradeAArtistByDistrict() {
    let uniqueData: any = [];
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getGradeAArtistDataByDistrict(this.userId).subscribe(res => {
      this.categoryWiseMasterData = res;

      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getGradeBArtistByDistrict() {
    let uniqueData: any = [];
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getGradeBArtistDataByDistrict(this.userId).subscribe(res => {
      this.categoryWiseMasterData = res;

      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }


  getGradeCArtistByDistrict() {
    let uniqueData: any = [];
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getGradeCArtistDataByDistrict(this.userId).subscribe(res => {
      this.categoryWiseMasterData = res;

      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }


  getGradeAllArtistByDistrict() {
    let uniqueData: any = [];
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getALLArtistDataByDistrict(this.userId).subscribe(res => {
      this.categoryWiseMasterData = res;

      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getHoldedGradeAArtistByDistrict() {
    let uniqueData: any = [];
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getHoldedGradeAArtistDataByDistrict(this.userId).subscribe(res => {
      this.categoryWiseMasterData = res;

      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getHoldedGradeBArtistByDistrict() {
    let uniqueData: any = [];
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getHoldedGradeBArtistDataByDistrict(this.userId).subscribe(res => {
      this.categoryWiseMasterData = res;

      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getHoldedGradeCArtistByDistrict() {
    let uniqueData: any = [];
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getHoldedGradeCArtistDataByDistrict(this.userId).subscribe(res => {
      this.categoryWiseMasterData = res;

      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getHoldedGradeAllArtistByDistrict() {
    let uniqueData: any = [];
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getHoldedGradeAllArtistDataByDistrict(this.userId).subscribe(res => {
      this.categoryWiseMasterData = res;

      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  ngOnDestroy() {
    this.userMasterSubscription.unsubscribe();
  }
}
