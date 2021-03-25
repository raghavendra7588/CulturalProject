import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { CasteWiseReport, CountWise, CountWiseReport } from '../employees.model';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { MatRadioChange } from '@angular/material/radio';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../dialog-view-proposal-form/date.adapter';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-religion-wise-consolidated-report',
  templateUrl: './religion-wise-consolidated-report.component.html',
  styleUrls: ['./religion-wise-consolidated-report.component.css'],
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
export class ReligionWiseConsolidatedReportComponent implements OnInit {


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

  religionData: any = [];
  reportFromDate: string;
  reportToDate: string;

  constructor(
    public formBuilder: FormBuilder,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
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
        if (this.currentUserRole === 'STATE_RELIGION_WISE_COUNT_REPORT') {
          this.currentStatusCode = 'State Religion Wise Count Report';

        }
        if (this.currentUserRole === 'ADMIN_RELIGION_WISE_COUNT_REPORT') {
          this.currentStatusCode = 'Admin Religion Wise Count Report';
        }
        if (this.currentUserRole === 'DISTRICT_RELIGION_WISE_COUNT_REPORT') {
          this.currentStatusCode = 'District Religion Wise Count Report';
        }
        if (this.currentUserRole === 'PANCHAYAT_RELIGION_WISE_COUNT_REPORT') {
          this.currentStatusCode = 'Panchayat Religion Wise Count Report';
        }
      }
      else {
        return;
      }
    });

    if (this.currentUserRole === 'STATE_RELIGION_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'State Religion Wise Count Report';
      this.displayedColumns = ['districtName', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }
    if (this.currentUserRole === 'ADMIN_RELIGION_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'Admin Religion Wise Count Report';
      this.displayedColumns = ['districtName', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }
    if (this.currentUserRole === 'DISTRICT_RELIGION_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'District Religion Wise Count Report';
      this.displayedColumns = ['panchayat', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }
    if (this.currentUserRole === 'PANCHAYAT_RELIGION_WISE_COUNT_REPORT') {
      this.currentStatusCode = 'Panchayat Religion Wise Count Report';
      this.displayedColumns = ['panchayat', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }

    this.getReligionData();



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
  getReligionData() {
    this.employeeService.getAllReligionTypeData().subscribe(data => {
      this.religionData = data;
      console.log('this.religionData ', this.religionData);
    });
  }


  onSearch() {

    if (this.casteWiseReport.reportType == 'Date Wise') {
      if (this.casteWiseReport.fromDate === null || this.casteWiseReport.fromDate === undefined || this.casteWiseReport.fromDate === ''
        || this.casteWiseReport.toDate === null || this.casteWiseReport.toDate === undefined || this.casteWiseReport.toDate === '') {
        this.toastr.error('From and To Date are Mandotary !!');
        return;
      }
    }


    if (this.casteWiseReport.religionName === null || this.casteWiseReport.religionName === undefined || this.casteWiseReport.religionName === '') {
      this.toastr.error('Religion is Mandotary !!');
      return;
    }

    if (this.casteWiseReport.religionName === null || this.casteWiseReport.religionName === undefined || this.casteWiseReport.religionName === '') {
      this.toastr.error('Religion Name is Mandotary !!');
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
      let fullToDate = this.valueChangedToDate(this.casteWiseReport.toDate);
      this.reportToDate = moment(fullToDate, 'DD/MM/YYYY').format("DD-MMM-YYYY");
    }



    this.casteWiseReport.userId = Number(this.userId);

    if (!this.isDateRangeSelected) {
      this.reportFromDate = '';
      this.reportToDate = '';
    }
    let reqObj = {
      userId: this.casteWiseReport.userId,
      districtId: this.casteWiseReport.districtId,
      religionName: this.casteWiseReport.religionName,
      fromDate: this.reportFromDate,
      toDate: this.reportToDate,
      reportType: this.casteWiseReport.reportType
    }
    console.log('reqObj', reqObj);

    if (this.role == 'STATE' || this.role == 'ADMIN') {

      this.employeeService.postConsolidatedReligionWiseReportByStateAndAdmin(reqObj).subscribe(res => {
        this.ReportDataStateAndAdmin = res;
        console.log('this.ReportDataStateAndAdmin', this.ReportDataStateAndAdmin);
        let removedKeys = _.omitBy(this.ReportDataStateAndAdmin, _.isNil);
        console.log('removedKeys', removedKeys);
        this.extractObjects(this.ReportDataStateAndAdmin);
      });
    }
    if (this.role == 'DISTRICT') {
      this.employeeService.postConsolidatedReligionWiseReportByDistrict(reqObj).subscribe(res => {
        this.ReportDataStateAndAdmin = res;

        this.dataSource = new MatTableDataSource(this.ReportDataStateAndAdmin);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
    if (this.role == 'GRAMPANCHAYAT') {
      this.employeeService.postConsolidatedReligionWiseReportByPanchyat(reqObj).subscribe(res => {
        this.ReportDataStateAndAdmin = res;

        this.dataSource = new MatTableDataSource(this.ReportDataStateAndAdmin);
        setTimeout(() => this.dataSource.paginator = this.paginator);
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

  valueChangedToDate(selectedDate) {
    let date = new Date(selectedDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")
    const day = `${date.getDate() + 1}`.padStart(2, "0")
    let stringDate = [day, month, year].join("/");
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
}
