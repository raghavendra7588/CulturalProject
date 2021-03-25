import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
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

@Component({
  selector: 'app-art-type-consolidated-count-wise-report',
  templateUrl: './art-type-consolidated-count-wise-report.component.html',
  styleUrls: ['./art-type-consolidated-count-wise-report.component.css'],
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
export class ArtTypeConsolidatedCountWiseReportComponent implements OnInit {


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



  countWise: CountWise = new CountWise();
  countWiseReport: CountWiseReport = new CountWiseReport();
  casteWiseReport: CasteWiseReport = new CasteWiseReport();

  artData: any = [];
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

    this.userId = Number(sessionStorage.getItem('userId'));


    this.currentUserRole = sessionStorage.getItem('userManagement');
    this.role = sessionStorage.getItem('role');
    this.districtId = Number(sessionStorage.getItem('DistrictId'));

    this.casteWiseReport.districtId = parseInt(sessionStorage.getItem('DistrictId'));
    this.casteWiseReport.userId = (this.userId);

    this.maxDate = new Date();
    this.countForm.controls.reportFromDate.disable();
    this.countForm.controls.reportToDate.disable();
    if (this.currentUserRole === 'STATE_ART_TYPE_COUNT_REPORT') {
      this.currentStatusCode = 'State Art Wise Count Report';
      this.displayedColumns = ['districtName', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }
    if (this.currentUserRole === 'ADMIN_ART_TYPE_COUNT_REPORT') {
      this.currentStatusCode = 'Admin Art Wise Count Report';
      this.displayedColumns = ['districtName', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }
    if (this.currentUserRole === 'DISTRICT_ART_TYPE_COUNT_REPORT') {
      this.currentStatusCode = 'District Art Wise Count Report';
      this.displayedColumns = ['panchayat', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }
    if (this.currentUserRole === 'PANCHAYAT_ART_TYPE_COUNT_REPORT') {
      this.currentStatusCode = 'Panchayat Art Wise Count Report';
      this.displayedColumns = ['panchayat', 'approvedGradeA', 'approvedGradeB', 'approvedGradeC', 'holdGradeA', 'holdGradeB', 'holdGradeC'];
    }

    this.getArtData();

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

  onSearch() {
    this.casteWiseReport.districtId = parseInt(sessionStorage.getItem('DistrictId'));
    if (this.casteWiseReport.reportType == 'Date Wise') {
      if (this.casteWiseReport.fromDate === null || this.casteWiseReport.fromDate === undefined || this.casteWiseReport.fromDate === ''
        || this.casteWiseReport.toDate === null || this.casteWiseReport.toDate === undefined || this.casteWiseReport.toDate === '') {
        this.toastr.error('From and To Date are Mandotary !!');
        return;
      }
    }
    if (this.casteWiseReport.artType === null || this.casteWiseReport.artType === undefined || this.casteWiseReport.artType === '') {
      this.toastr.error('Art Type is Mandotary !!');
      return;
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
      artType: this.casteWiseReport.artType,
      fromDate: this.reportFromDate,
      toDate: this.reportToDate,
      reportType: this.casteWiseReport.reportType
    }
    console.log('reqObj', reqObj);
 

    if (this.role == 'STATE' || this.role == 'ADMIN') {

      this.employeeService.postConsolidatedArtWiseReportByStateAndAdmin(reqObj).subscribe(res => {
        this.ReportDataStateAndAdmin = res;
        console.log('this.ReportDataStateAndAdmin', this.ReportDataStateAndAdmin);
        let removedKeys = _.omitBy(this.ReportDataStateAndAdmin, _.isNil);
        console.log('removedKeys', removedKeys);
        this.extractObjects(this.ReportDataStateAndAdmin);
      });
    }
    if (this.role == 'DISTRICT') {
      this.employeeService.postConsolidatedArtWiseReportByDistrict(reqObj).subscribe(res => {
        this.ReportDataStateAndAdmin = res;

        this.dataSource = new MatTableDataSource(this.ReportDataStateAndAdmin);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    }
    if (this.role == 'GRAMPANCHAYAT') {
      this.employeeService.postConsolidatedArtWiseReportByPanchyat(reqObj).subscribe(res => {
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

 
  getArtData() {
    this.employeeService.getAllArtTypeData().subscribe(data => {
      this.artData = data;
      console.log('casteData', this.artData);
    });
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
