import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '../dialog-view-proposal-form/date.adapter';
import { CasteWiseReport, CountWise, CountWiseReport } from '../employees.model';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { ExportToCsv } from 'export-to-csv';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consolidated-rejected-report',
  templateUrl: './consolidated-rejected-report.component.html',
  styleUrls: ['./consolidated-rejected-report.component.css'],
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
export class ConsolidatedRejectedReportComponent implements OnInit {
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

  casteWiseReport: CasteWiseReport = new CasteWiseReport();
  reportFromDate: string;
  reportToDate: string;

  constructor(
    public formBuilder: FormBuilder,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public dialog: MatDialog,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
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



    this.emitterService.isUserMasterSelected.subscribe(val => {
      if (val) {
        this.currentUserRole = sessionStorage.getItem('userManagement');
        if (this.currentUserRole === 'STATE_REJECTED_WISE_COUNT_REPORT') {
          this.currentStatusCode = 'State Rejected Report';

        }
        if (this.currentUserRole === 'ADMIN_REJECTED_WISE_COUNT_REPORT') {
          this.currentStatusCode = 'Admin Rejected Report';
        }
        if (this.currentUserRole === 'DISTRICT_REJECTED_WISE_COUNT_REPORT') {
          this.currentStatusCode = 'District Rejected Report';
        }
        if (this.currentUserRole === 'PANCHAYAT_REJECTED_WISE_COUNT_REPORT') {
          this.currentStatusCode = 'Panchayat Rejected Report';
        }
      }
      else {
        return;
      }
    });




    if (this.currentUserRole === 'STATE_REJECTED_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'State Rejected Report';
      this.displayedColumns = ['districtName', 'rejected'];
    }
    if (this.currentUserRole === 'ADMIN_REJECTED_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'Admin Rejected Report';
      this.displayedColumns = ['districtName', 'rejected'];
    }
    if (this.currentUserRole === 'DISTRICT_REJECTED_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'District Rejected Report';
      this.displayedColumns = ['panchayat', 'rejected'];
    }
    if (this.currentUserRole === 'PANCHAYAT_REJECTED_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'Panchayat Rejected Report';
      this.displayedColumns = ['panchayat', 'rejected'];
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
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
  }



  valueChangedDate(selectedDate) {
    let date = new Date(selectedDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")
    const day = `${date.getDate()}`.padStart(2, "0")
    let stringDate = [year, month, day].join("/");
    return stringDate;
  }

  valueChangedToDate(selectedDate) {
    let date = new Date(selectedDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")
    const day = `${date.getDate() + 1}`.padStart(2, "0")
    let stringDate = '';
    if (day == '32') {
      stringDate = [year, month, '31'].join("/") + ' ' + '23:59:59.999';
    }
    else {
      stringDate = [year, month, day].join("/");
    }
    return stringDate;
  }


  onSearch() {
    this.casteWiseReport.districtId = parseInt(sessionStorage.getItem('DistrictId'));
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

    if (this.casteWiseReport.fromDate === null || this.casteWiseReport.fromDate === undefined || this.casteWiseReport.fromDate === '') {
      this.casteWiseReport.fromDate = "";
      this.reportFromDate = '';
    }
    else {
      let fullFromDate = this.valueChangedDate(this.casteWiseReport.fromDate);
      this.reportFromDate = fullFromDate;
    }

    if (this.casteWiseReport.toDate === null || this.casteWiseReport.toDate === undefined || this.casteWiseReport.toDate === '') {
      this.casteWiseReport.toDate = "";
      this.reportToDate = '';
    }
    else {
      let fullToDate = this.valueChangedToDate(this.casteWiseReport.toDate);
      this.reportToDate = fullToDate;
    }

    this.casteWiseReport.userId = Number(this.userId);

    if (!this.isDateRangeSelected) {
      this.reportFromDate = '';
      this.reportToDate = '';
    }

    let reqObj = {
      userId: this.casteWiseReport.userId,
      districtId: this.casteWiseReport.districtId,
      fromDate: this.reportFromDate,
      toDate: this.reportToDate,
      reportType: this.casteWiseReport.reportType
    }
    console.log('reqObj', reqObj);

    if (this.role == 'STATE' || this.role == 'ADMIN') {
      this.spinner.show(undefined,
        {
          type: "square-jelly-box",
          size: "medium",
          color: 'white'
        }
      );
      this.employeeService.postConsolidatedRejectedReportByStateAndAdmin(reqObj).subscribe(res => {
        this.ReportDataStateAndAdmin = res;
        console.log('this.ReportDataStateAndAdmin', this.ReportDataStateAndAdmin);
        let removedKeys = _.omitBy(this.ReportDataStateAndAdmin, _.isNil);
        console.log('removedKeys', removedKeys);
        this.extractObjects(this.ReportDataStateAndAdmin);
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
    }
    if (this.role == 'DISTRICT') {
      this.spinner.show(undefined,
        {
          type: "square-jelly-box",
          size: "medium",
          color: 'white'
        }
      );
      this.employeeService.postConsolidatedRejectedReportByDistrict(reqObj).subscribe(res => {
        this.ReportDataStateAndAdmin = res;
        this.spinner.hide();
        this.dataSource = new MatTableDataSource(this.ReportDataStateAndAdmin);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      }, err => {
        this.spinner.hide();
      });
    }
    if (this.role == 'GRAMPANCHAYAT') {
      this.spinner.show(undefined,
        {
          type: "square-jelly-box",
          size: "medium",
          color: 'white'
        }
      );
      this.employeeService.postConsolidatedRejectedReportByPanchyat(reqObj).subscribe(res => {
        this.ReportDataStateAndAdmin = res;
        this.spinner.hide();
        this.dataSource = new MatTableDataSource(this.ReportDataStateAndAdmin);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      }, err => {
        this.spinner.hide();
      });
    }

  }


  downloadReport() {

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      // useKeysAsHeaders: true
      headers: ['Name', 'Rejected']
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.ReportDataStateAndAdmin);
  }


  extractObjects(arr) {
    let extractedArray: any = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].REJECTED_A == null) {
        continue;
      }
      else {
        extractedArray.push(arr[i]);
      }
    }
    this.ReportDataStateAndAdmin = extractedArray;
    console.log('extractedArray', extractedArray);
    this.dataSource = new MatTableDataSource(extractedArray);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }
}
