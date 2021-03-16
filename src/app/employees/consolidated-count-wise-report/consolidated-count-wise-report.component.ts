import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '../dialog-personal-detail/date.adapter';
import { CountWise, CountWiseReport } from '../employees.model';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consolidated-count-wise-report',
  templateUrl: './consolidated-count-wise-report.component.html',
  styleUrls: ['./consolidated-count-wise-report.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS
    }
  ]
})
export class ConsolidatedCountWiseReportComponent implements OnInit {

  dataSource: any;
  displayedColumns;

  countForm: FormGroup;
  countWise: CountWise = new CountWise();
  countWiseReport: CountWiseReport = new CountWiseReport();

  userId: number;
  currentUserRole: string;
  currentStatusCode: string;
  reportTypeArray: any;
  isDateRangeSelected: boolean = false;
  maxDate: any;
  ReportDataStateAndAdmin: any = [];
  artTypeData: any = [];
  role: string;
  districtId: Number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    public formBuilder: FormBuilder,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public dialog: MatDialog
  ) {
    this.countForm = this.formBuilder.group({
      reportType: [''],
      reportFromDate: [''],
      reportToDate: ['']
    });


    this.reportTypeArray = [
      { id: 0, title: 'ALL' },
      { id: 1, title: 'Date Wise' }

    ];
  }

  ngOnInit(): void {

    this.userId = Number(sessionStorage.getItem('userId'));
    this.currentUserRole = sessionStorage.getItem('userManagement');
    this.role = sessionStorage.getItem('role');
    this.districtId = Number(sessionStorage.getItem('DistrictId'));
    this.maxDate = new Date();
    this.countForm.controls.reportFromDate.disable();
    this.countForm.controls.reportToDate.disable();

    this.getArtTypeData();

    this.emitterService.isUserMasterSelected.subscribe(val => {
      if (val) {
        this.currentUserRole = sessionStorage.getItem('userManagement');
        if (this.currentUserRole === 'STATE_COUNT_REPORT') {
          this.currentStatusCode = 'State Count Wise Report';

        }
        if (this.currentUserRole === 'ADMIN_COUNT_REPORT') {
          this.currentStatusCode = 'Admin Count Wise Report';
        }
        if (this.currentUserRole === 'DISTRICT_COUNT_REPORT') {
          this.currentStatusCode = 'District Count Wise Report';
        }
        if (this.currentUserRole === 'PANCHAYAT_COUNT_REPORT') {
          this.currentStatusCode = 'Panchayat Count Wise Report';
        }
      }
      else {
        return;
      }
    });




    if (this.currentUserRole === 'STATE_COUNT_REPORT') {
      this.currentStatusCode = 'State Count Wise Report';
      this.displayedColumns = ['districtName', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC',
        'rejectedA', 'rejectedB', 'rejectedC'];
    }
    if (this.currentUserRole === 'ADMIN_COUNT_REPORT') {
      this.currentStatusCode = 'Admin Count Wise Report';
      this.displayedColumns = ['districtName', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC',
        'rejectedA', 'rejectedB', 'rejectedC'];
    }
    if (this.currentUserRole === 'DISTRICT_COUNT_REPORT') {
      this.currentStatusCode = 'District Count Wise Report';
      this.displayedColumns = ['panchayat', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC',
        'rejectedA', 'rejectedB', 'rejectedC'];
    }
    if (this.currentUserRole === 'PANCHAYAT_COUNT_REPORT') {
      this.currentStatusCode = 'Panchayat Count Wise Report';
      this.displayedColumns = ['panchayat', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC',
        'rejectedA', 'rejectedB', 'rejectedC'];
    }
  }


  radioChange($event: MatRadioChange) {
    console.log($event.source.name, $event.value);
    if ($event.value === 'Date Wise') {
      this.isDateRangeSelected = true;

      this.countForm.controls.reportFromDate.enable();
      this.countForm.controls.reportToDate.enable();
    }
    if ($event.value === 'ALL') {
      this.isDateRangeSelected = false;
      this.countForm.controls.reportFromDate.disable();
      this.countForm.controls.reportToDate.disable();
    }

  }




  valueChangedDate(selectedDate) {
    let date = new Date(selectedDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")
    const day = `${date.getDate()}`.padStart(2, "0")
    let stringDate = [day, month, year].join("/");
    return stringDate;
  }

  onSearch() {
  

    if (this.countWise.reportType === null || this.countWise.reportType === undefined || this.countWise.reportType === '') {
      this.countWise.reportType = "ALL";
    }

    if (this.countWise.reportFromDate === null || this.countWise.reportFromDate === undefined || this.countWise.reportFromDate === '') {
      this.countWise.reportFromDate = "";
    }
    else {
      let fullFromDate = this.valueChangedDate(this.countWise.reportFromDate);
      this.countWiseReport.reportFromDate = fullFromDate;
    }

    if (this.countWise.reportToDate === null || this.countWise.reportToDate === undefined || this.countWise.reportToDate === '') {
      this.countWise.reportToDate = "";
    }
    else {
      let fullToDate = this.valueChangedDate(this.countWise.reportToDate);
      this.countWiseReport.reportToDate = fullToDate;
    }

    this.countWiseReport.userId = Number(this.userId);
    this.countWiseReport.reportType = this.countWise.reportType;
  

    if (this.role == 'STATE' || this.role == 'ADMIN') {

      this.employeeService.getConsolidatedReportByAdmin().subscribe(res => {
        this.ReportDataStateAndAdmin = res;
        console.log('this.ReportDataStateAndAdmin', this.ReportDataStateAndAdmin);
        let removedKeys = _.omitBy(this.ReportDataStateAndAdmin, _.isNil);
        console.log('removedKeys', removedKeys);
        this.extractObjects(this.ReportDataStateAndAdmin);
      });
    }
    if (this.role == 'DISTRICT') {
      this.employeeService.getConsolidatedReportByDistrict(this.districtId).subscribe(res => {
        this.ReportDataStateAndAdmin = res;
       
        this.dataSource = new MatTableDataSource(this.ReportDataStateAndAdmin);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
    if (this.role == 'GRAMPANCHAYAT') {
      this.employeeService.getConsolidatedReportByPanchayat(this.userId).subscribe(res => {
        this.ReportDataStateAndAdmin = res;
       
        this.dataSource = new MatTableDataSource(this.ReportDataStateAndAdmin);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }

  }


  downloadReport() {

  }


  extractObjects(arr) {
    let extractedArray: any = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].APPROVED_A == null && arr[i].APPROVED_B == null && arr[i].APPROVED_C == null &&
        arr[i].HOLD_A == null && arr[i].HOLD_B == null && arr[i].HOLD_C == null &&
        arr[i].REJECTED_A == null && arr[i].REJECTED_B == null && arr[i].REJECTED_C == null
      ) {
        continue;
      }
      else {
        extractedArray.push(arr[i]);
      }
    }

    console.log('extractedArray', extractedArray);
    this.dataSource = new MatTableDataSource(extractedArray);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  getArtTypeData() {
    this.employeeService.getAllArtTypeData().subscribe(data => {
      this.artTypeData = data;
      console.log(' this.artTypeData', this.artTypeData);
    });
  }
}