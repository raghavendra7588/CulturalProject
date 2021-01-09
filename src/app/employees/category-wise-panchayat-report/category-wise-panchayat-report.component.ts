import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { DynamicPanchayatName, DynamicStateApproved } from '../employees.model';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-category-wise-panchayat-report',
  templateUrl: './category-wise-panchayat-report.component.html',
  styleUrls: ['./category-wise-panchayat-report.component.css']
})
export class CategoryWisePanchayatReportComponent implements OnInit {

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


  constructor(
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService
  ) {
    this.userId = parseInt(sessionStorage.getItem('userId'));
    this.currentUserRole = sessionStorage.getItem('userManagement');
    // this.getDistrictMasterData();
    this.emitterService.isUserMasterSelected.subscribe(val => {
      if (val) {
        this.currentUserRole = sessionStorage.getItem('userManagement');
        if (this.currentUserRole === 'GRAMPANCHAYAT_A') {
          this.getGradeAApprovedData(this.userId);
          this.currentGrade = 'A';
        }
        if (this.currentUserRole === 'GRAMPANCHAYAT_B') {
          this.getGradeBApprovedData(this.userId);
          this.currentGrade = 'B';
        }
        if (this.currentUserRole === 'GRAMPANCHAYAT_C') {
          this.getGradeCApprovedData(this.userId);
          this.currentGrade = 'C';
        }
        if (this.currentUserRole === 'GRAMPANCHAYAT_ALL') {
          this.getAllGradeApprovedData(this.userId);
          this.currentGrade = 'ALL';
        }


        if (this.currentUserRole === 'GRAMPANCHAYAT_HOLD_A') {
          this.getHoldedGradeAData(this.userId);
          this.currentGrade = 'A';
        }
        if (this.currentUserRole === 'GRAMPANCHAYAT_HOLD_B') {
          this.getHoldedGradeBData(this.userId);
          this.currentGrade = 'B';
        }
        if (this.currentUserRole === 'GRAMPANCHAYAT_HOLD_C') {
          this.getHoldedGradeCData(this.userId);
          this.currentGrade = 'C';
        }
        if (this.currentUserRole === 'GRAMPANCHAYAT_HOLD_ALL') {
          this.getAllHoldeGradeData(this.userId);
          this.currentGrade = 'ALL';
        }
      }
      else {
        return;
      }
    });


    if (this.currentUserRole === 'GRAMPANCHAYAT_A') {
      this.getGradeBApprovedData(this.userId);
      this.currentGrade = 'A';
    }
    if (this.currentUserRole === 'GRAMPANCHAYAT_B') {
      this.getGradeBApprovedData(this.userId);
      this.currentGrade = 'B';
    }
    if (this.currentUserRole === 'GRAMPANCHAYAT_C') {
      this.getGradeBApprovedData(this.userId);
      this.currentGrade = 'C';
    }
    if (this.currentUserRole === 'GRAMPANCHAYAT_ALL') {
      this.getAllGradeApprovedData(this.userId);
      this.currentGrade = 'ALL';
    }

    if (this.currentUserRole === 'GRAMPANCHAYAT_HOLD_A') {
      this.getHoldedGradeAData(this.userId);
      this.currentGrade = 'A';
    }
    if (this.currentUserRole === 'GRAMPANCHAYAT_HOLD_B') {
      this.getHoldedGradeBData(this.userId);
      this.currentGrade = 'B';
    }
    if (this.currentUserRole === 'GRAMPANCHAYAT_HOLD_C') {
      this.getHoldedGradeCData(this.userId);
      this.currentGrade = 'C';
    }
    if (this.currentUserRole === 'GRAMPANCHAYAT_HOLD_ALL') {
      this.getAllHoldeGradeData(this.userId);
      this.currentGrade = 'ALL';
    }
  }

  ngOnInit(): void {
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  getGradeAApprovedData(userId) {
    let uniqueData: any = [];
    this.employeeService.getGradeWiseData(userId).subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getGradeBApprovedData(userId) {
    let uniqueData: any = [];
    this.employeeService.getGradeBWiseData(userId).subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }



  getGradeCApprovedData(userId) {
    let uniqueData: any = [];
    this.employeeService.getGradeCWiseData(userId).subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }


  getAllGradeApprovedData(userId) {
    let uniqueData: any = [];
    this.employeeService.getAllGradeWiseDataAtPanchayat(userId).subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }



  getHoldedGradeAData(userId) {
    let uniqueData: any = [];
    this.employeeService.getHoldedGradeAArtistData(userId).subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getHoldedGradeBData(userId) {
    let uniqueData: any = [];
    this.employeeService.getHoldedGradeBArtistData(userId).subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getHoldedGradeCData(userId) {
    let uniqueData: any = [];
    this.employeeService.getHoldedGradeCArtistData(userId).subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }


  getAllHoldeGradeData(userId) {
    let uniqueData: any = [];
    this.employeeService.getHoldedAllGradeWiseDataAtPanchayat(userId).subscribe(res => {
      this.categoryWiseMasterData = res;
      uniqueData = _.uniqBy(this.categoryWiseMasterData, 'id');
      this.categoryWiseMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.categoryWiseMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

}
