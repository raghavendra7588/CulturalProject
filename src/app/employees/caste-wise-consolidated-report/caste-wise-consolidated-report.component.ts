import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '../dialog-view-proposal-form/date.adapter';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { CasteWiseReport, CountWise, CountWiseReport } from '../employees.model';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ExportToCsv } from 'export-to-csv';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-caste-wise-consolidated-report',
  templateUrl: './caste-wise-consolidated-report.component.html',
  styleUrls: ['./caste-wise-consolidated-report.component.css'],
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
export class CasteWiseConsolidatedReportComponent implements OnInit {

  dataSource: any;
  displayedColumns;

  countForm: FormGroup;

  countWise: CountWise = new CountWise();
  countWiseReport: CountWiseReport = new CountWiseReport();
  casteWiseReport: CasteWiseReport = new CasteWiseReport();

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

  casteData: any = [];
  reportFromDate: string;
  reportToDate: string;


  constructor(
    public formBuilder: FormBuilder,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
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
        if (this.currentUserRole === 'STATE_CAST_WISE_COUNT_REPORT') {
          this.currentStatusCode = 'State Caste Wise Count Report';

        }
        if (this.currentUserRole === 'ADMIN_COUNT_REPORT') {
          this.currentStatusCode = 'Admin Caste Wise Count Report';
        }
        if (this.currentUserRole === 'DISTRICT_COUNT_REPORT') {
          this.currentStatusCode = 'District Caste Wise Count Report';
        }
        if (this.currentUserRole === 'PANCHAYAT_COUNT_REPORT') {
          this.currentStatusCode = 'Panchayat Caste Wise Count Report';
        }
      }
      else {
        return;
      }
    });

    if (this.currentUserRole === 'STATE_CAST_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'State Cast Wise Report';
      this.displayedColumns = ['districtName', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }
    if (this.currentUserRole === 'ADMIN_CAST_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'Admin Cast Wise Report';
      this.displayedColumns = ['districtName', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }
    if (this.currentUserRole === 'DISTRICT_CAST_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'District Cast Wise Report';
      this.displayedColumns = ['panchayat', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }
    if (this.currentUserRole === 'PANCHAYAT_CAST_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'Panchayat Cast Wise Report';
      this.displayedColumns = ['panchayat', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }

    this.getCastData();

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
  extractObjects(arr) {
    let extractedArray: any = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].APPROVED_A == null && arr[i].APPROVED_B == null && arr[i].APPROVED_C == null &&
        arr[i].HOLD_A == null && arr[i].HOLD_B == null && arr[i].HOLD_C == null
      ) {
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

    if (this.casteWiseReport.castName === null || this.casteWiseReport.castName === undefined || this.casteWiseReport.castName === '') {
      this.toastr.error('Cast is Mandotary !!');
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


    if (!this.isDateRangeSelected) {
      this.reportFromDate = '';
      this.reportToDate = '';
    }
    this.casteWiseReport.userId = Number(this.userId);

    let reqObj = {
      userId: this.casteWiseReport.userId,
      districtId: this.casteWiseReport.districtId,
      castName: this.casteWiseReport.castName,
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
      this.employeeService.postConsolidatedCasteWiseReportByStateAndAdmin(reqObj).subscribe(res => {
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
      this.employeeService.postConsolidatedCasteWiseReportByDistrict(reqObj).subscribe(res => {
        this.ReportDataStateAndAdmin = res;
        this.dataSource = new MatTableDataSource(this.ReportDataStateAndAdmin);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.spinner.hide();

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
      this.employeeService.postConsolidatedCasteWiseReportByPanchyat(reqObj).subscribe(res => {
        this.ReportDataStateAndAdmin = res;
        this.dataSource = new MatTableDataSource(this.ReportDataStateAndAdmin);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.spinner.hide();

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
      headers: ['Name', 'Approved Grade A', 'Approved Grade B', 'Approved Grade C',
        'Holded Grade A', 'Holded Grade B', 'Holded Grade C']
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.ReportDataStateAndAdmin);
  }

  getCastData() {
    this.employeeService.getAllCastTypeData().subscribe(data => {
      this.casteData = data;
      console.log('casteData', this.casteData);
    });
  }

}
