import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '../dialog-view-proposal-form/date.adapter';
import { CasteWiseReport} from '../employees.model';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { MatRadioChange } from '@angular/material/radio';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grade-wise-consolidated-report',
  templateUrl: './grade-wise-consolidated-report.component.html',
  styleUrls: ['./grade-wise-consolidated-report.component.css'],
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
export class GradeWiseConsolidatedReportComponent implements OnInit {

  dataSource: any;
  displayedColumns;

  countForm: FormGroup;

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



  casteWiseReport: CasteWiseReport = new CasteWiseReport();

  gradeData: any = [];
  reportFromDate: string;
  reportToDate: string;

  constructor(
    public formBuilder: FormBuilder,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {
    this.countForm = this.formBuilder.group({
      castType: [''],
      reportType: [''],
      reportFromDate: [''],
      reportToDate: ['']
    });


  }

  ngOnInit(): void {
    this.reportTypeArray = [
      { id: 0, title: 'ALL' },
      { id: 1, title: 'Date Wise' }
    ];

    this.gradeData = [
      { id: 0, title: 'A' },
      { id: 1, title: 'B' },
      { id: 1, title: 'C' }
    ];

    this.userId = Number(sessionStorage.getItem('userId'));


    this.currentUserRole = sessionStorage.getItem('userManagement');
    this.role = sessionStorage.getItem('role');
    this.districtId = Number(sessionStorage.getItem('DistrictId'));

    this.casteWiseReport.districtId = parseInt(sessionStorage.getItem('DistrictId'));
    this.casteWiseReport.userId = (this.userId);

    this.maxDate = new Date();
    this.countForm.controls.reportFromDate.disable();
    this.countForm.controls.reportToDate.disable();


    this.emitterService.isUserMasterSelected.subscribe(val => {
      if (val) {
        this.currentUserRole = sessionStorage.getItem('userManagement');
        if (this.currentUserRole === 'STATE_GRADE_TYPE_COUNT_REPORT') {
          this.currentStatusCode = 'State Grade Wise Count Report';

        }
        if (this.currentUserRole === 'ADMIN_GRADE_TYPE_COUNT_REPORT') {
          this.currentStatusCode = 'Admin Grade Wise Count Report';
        }
        if (this.currentUserRole === 'DISTRICT_GRADE_TYPE_COUNT_REPORT') {
          this.currentStatusCode = 'District Grade Wise Count Report';
        }
        if (this.currentUserRole === 'PANCHAYAT_GRADE_TYPE_COUNT_REPORT') {
          this.currentStatusCode = 'Panchayat Grade Wise Count Report';
        }
      }
      else {
        return;
      }
    });

    if (this.currentUserRole === 'STATE_GRADE_TYPE_COUNT_REPORT') {
      this.currentStatusCode = 'State Art Wise Count Report';
      this.displayedColumns = ['districtName', 'approvedGradeA', 'holdGradeA', 'rejectedA'];
    }
    if (this.currentUserRole === 'ADMIN_GRADE_TYPE_COUNT_REPORT') {
      this.currentStatusCode = 'Admin Art Wise Count Report';
      this.displayedColumns = ['districtName', 'approvedGradeA', 'holdGradeA', 'rejectedA',];
    }
    if (this.currentUserRole === 'DISTRICT_GRADE_TYPE_COUNT_REPORT') {
      this.currentStatusCode = 'District Art Wise Count Report';
      this.displayedColumns = ['panchayat', 'approvedGradeA', 'holdGradeA', 'rejectedA',];
    }
    if (this.currentUserRole === 'PANCHAYAT_GRADE_TYPE_COUNT_REPORT') {
      this.currentStatusCode = 'Panchayat Art Wise Count Report';
      this.displayedColumns = ['panchayat', 'approvedGradeA', 'holdGradeA', 'rejectedA',];
    }
  }
  radioChange($event: MatRadioChange) {
    console.log($event.source.name, $event.value);
    if ($event.value === 'Date Wise') {

      if (!this.casteWiseReport.fromDate || !this.casteWiseReport.toDate) {
        this.isDateRangeSelected = true;
      }
      else {
        this.isDateRangeSelected = false;
      }

      this.countForm.controls.reportFromDate.enable();
      this.countForm.controls.reportToDate.enable();
    }
    if ($event.value === 'ALL') {
      this.isDateRangeSelected = true;
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

  extractObjects(arr) {
    let extractedArray: any = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].APPROVED == null &&
        arr[i].HOLD == null &&
        arr[i].REJECTED == null
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

  onSearch() {

    if (this.casteWiseReport.reportType == 'Date Wise') {
      if (this.casteWiseReport.fromDate === null || this.casteWiseReport.fromDate === undefined || this.casteWiseReport.fromDate === ''
        || this.casteWiseReport.toDate === null || this.casteWiseReport.toDate === undefined || this.casteWiseReport.toDate === '') {
        this.toastr.error('From and To Date are Mandotary !!');
        return;
      }
    }


    if (this.casteWiseReport.reportType === null || this.casteWiseReport.reportType === undefined || this.casteWiseReport.reportType === '') {
     
      this.toastr.error('Report Type is Mandotary !!');
      return;
    }

    if (this.casteWiseReport.gradeType === null || this.casteWiseReport.gradeType === undefined || this.casteWiseReport.gradeType === '') {
      this.toastr.error('Grade Type is Mandotary !!');
      return;
    }


    if (this.casteWiseReport.fromDate === null || this.casteWiseReport.fromDate === undefined || this.casteWiseReport.fromDate === '') {
      this.casteWiseReport.fromDate = "";
      this.reportFromDate = '';
    }
    else {
      let fullFromDate = this.valueChangedDate(this.casteWiseReport.fromDate);
      this.reportFromDate = moment(fullFromDate, 'DD/MM/YYYY').format("DD-MMM-YYYY");

    }

    if (this.casteWiseReport.toDate === null || this.casteWiseReport.toDate === undefined || this.casteWiseReport.toDate === '') {
      this.casteWiseReport.toDate = "";
      this.reportToDate = '';
    }
    else {
      let fullToDate = this.valueChangedDate(this.casteWiseReport.toDate);
      this.reportToDate = moment(fullToDate, 'DD/MM/YYYY').format("DD-MMM-YYYY");
    }



    this.casteWiseReport.userId = Number(this.userId);

    let reqObj = {
      userId: this.casteWiseReport.userId,
      districtId: this.casteWiseReport.districtId,
      gradeType: this.casteWiseReport.gradeType,
      fromDate: this.reportFromDate,
      toDate: this.reportToDate,
      reportType: this.casteWiseReport.reportType
    }
    console.log('reqObj', reqObj);

    if (this.role == 'STATE' || this.role == 'ADMIN') {

      this.employeeService.postConsolidatedGradeWiseReportByStateAndAdmin(this.casteWiseReport).subscribe(res => {
        this.ReportDataStateAndAdmin = res;
        console.log('this.ReportDataStateAndAdmin', this.ReportDataStateAndAdmin);
        let removedKeys = _.omitBy(this.ReportDataStateAndAdmin, _.isNil);
        console.log('removedKeys', removedKeys);
        this.extractObjects(this.ReportDataStateAndAdmin);
      });
    }
    if (this.role == 'DISTRICT') {
      this.employeeService.postConsolidatedCasteWiseReportByDistrict(this.casteWiseReport).subscribe(res => {
        this.ReportDataStateAndAdmin = res;

        this.dataSource = new MatTableDataSource(this.ReportDataStateAndAdmin);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
    if (this.role == 'GRAMPANCHAYAT') {
      this.employeeService.postConsolidatedGradeWiseReportByPanchyat(this.casteWiseReport).subscribe(res => {
        this.ReportDataStateAndAdmin = res;

        this.dataSource = new MatTableDataSource(this.ReportDataStateAndAdmin);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }

  }


  downloadReport() {

  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.isDateRangeSelected = true;
  }
}
