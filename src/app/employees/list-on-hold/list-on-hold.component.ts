import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DynamicOnHoldArtistByState, DynamicStateReject, ReqToPutOnHoldByPanchayat } from '../employees.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-on-hold',
  templateUrl: './list-on-hold.component.html',
  styleUrls: ['./list-on-hold.component.css']
})
export class ListOnHoldComponent implements OnInit {
  displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  listOnHoldData: any = [];

  userId: number;
  role: string;

  modalRef: BsModalRef;
  message: string;

  artistResponse: any;

  reqToPutOnHoldByPanchayat: ReqToPutOnHoldByPanchayat = new ReqToPutOnHoldByPanchayat();
  dynamicOnHoldArtistByState: DynamicOnHoldArtistByState = new DynamicOnHoldArtistByState();
  dynamicStateReject: DynamicStateReject = new DynamicStateReject();

  statusMaster: any = [];
  reqToRemoveFromHoldByPanchayat: number;
  districtData: any = [];

  panchayatData: any = [];

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.userId = Number(sessionStorage.getItem('userId'));
    this.role = sessionStorage.getItem('role');
    if (this.role === 'GRAMPANCHAYAT') {
      this.displayedColumns = ['artistCode', 'fullName', 'place', 'approvalStatus', 'holdBy', 'holdAt', 'view', 'action'];
      this.getListOnHoldDataByPachayat(this.userId);
    }
    if (this.role === 'DISTRICT') {
      this.displayedColumns = ['artistCode', 'fullName', 'place', 'approvalStatus', 'holdBy', 'holdAt', 'view'];
      this.getListOnHoldDataByDistrict(this.userId);
    }
    if (this.role === 'STATE') {
      this.displayedColumns = ['artistCode', 'fullName', 'district', 'place', 'approvalStatus', 'holdBy', 'holdAt', 'view',];
      this.getDistrictMasterData();
      this.getOnHoldArtistDataByState();
    }
    if (this.role === 'ADMIN') {
      this.displayedColumns = ['artistCode', 'fullName', 'district', 'place', 'approvalStatus', 'holdBy', 'holdAt', 'view',];
      this.getDistrictMasterData();
      this.getOnHoldArtistDataByAdmin();
    }


    this.emitterService.isPanchyatArtistPuttedOnHold.subscribe(val => {
      if (val) {
        if (this.role === 'GRAMPANCHAYAT') {
          this.getListOnHoldDataByPachayat(this.userId);
        }
        if (this.role === 'DISTRICT') {
          this.getListOnHoldDataByDistrict(this.userId);
        }
        if (this.role === 'STATE') {
          this.getDistrictMasterData();
          this.getOnHoldArtistDataByState();
        }
        if (this.role === 'ADMIN') {
          this.getDistrictMasterData();
          this.getOnHoldArtistDataByAdmin();
        }
      }
    });
  }

  ngOnInit(): void {
    this.getStatusMaster();
  }

  getListOnHoldDataByDistrict(userId) {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getOnHoldAtDistrict(userId).subscribe(res => {
      this.listOnHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.listOnHoldData, 'id');
      this.listOnHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.listOnHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    });
  }

  getListOnHoldDataByPachayat(userId) {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getOnHoldAtPanchayat(userId).subscribe(res => {
      this.listOnHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.listOnHoldData, 'id');
      this.listOnHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.listOnHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getOnHoldArtistDataByState() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getReqToHoldAtState().subscribe(res => {
      this.listOnHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.listOnHoldData, 'id');
      this.listOnHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.listOnHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getOnHoldArtistDataByAdmin() {
    this.spinner.show(undefined,
      {
        type: "square-jelly-box",
        size: "medium",
        color: 'white'
      }
    );
    this.employeeService.getListOnHoldByAdminUser().subscribe(res => {
      this.listOnHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.listOnHoldData, 'id');
      this.listOnHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.listOnHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  viewEmployee(employee) {
    sessionStorage.removeItem('action');
    sessionStorage.setItem('action', 'viewByPanchayat');
    this.dialog.open(DialogViewProposalFormComponent, {
      height: '600px',
      width: '1200px',
      data: employee,
      disableClose: true
    });
  }

  viewHoldEmployee(employee) {
    sessionStorage.removeItem('action');
    sessionStorage.setItem('action', 'hold');
    this.dialog.open(DialogViewProposalFormComponent, {
      height: '600px',
      width: '1200px',
      data: employee,
      disableClose: true
    });
  }


  openModal(template: TemplateRef<any>, artist) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.artistResponse = artist;
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.reqToPutOnHoldByPanchayat.id = Number(this.artistResponse.id);
    this.reqToPutOnHoldByPanchayat.statusId = Number(this.reqToRemoveFromHoldByPanchayat);
    this.reqToPutOnHoldByPanchayat.userId = this.userId;

    this.employeeService.postReqToPutOnHoldByPanchayat(this.reqToPutOnHoldByPanchayat).subscribe(res => {
      this.toastr.success('Requested Successfully');
      this.emitterService.isPanchyatArtistPuttedOnHold.emit(true);
    });
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  getStatusMaster() {
    this.employeeService.getStatusMasterData().subscribe(res => {
      this.statusMaster = res;
      this.reqToRemoveFromHoldByPanchayat = this.statusMaster[13].StatusId;
    });
  }

  getDistrictMasterData() {
    this.employeeService.getDistrictMasterData().subscribe(res => {
      this.districtData = res;
    });
  }

  selectedDistrictFromList(district) {
    this.dynamicOnHoldArtistByState.DistrictId = district.DistrictId;
    this.employeeService.getPanchayatBasedOnDistrictId(this.dynamicOnHoldArtistByState.DistrictId).subscribe(res => {
      this.panchayatData = res;
    });
  }



  searchRecord() {
    if (this.dynamicOnHoldArtistByState.DistrictId === null || this.dynamicOnHoldArtistByState.DistrictId === undefined) {
      this.dynamicOnHoldArtistByState.DistrictId = 0;
    }
    if (this.dynamicOnHoldArtistByState.panchayatName === null || this.dynamicOnHoldArtistByState.panchayatName === undefined || this.dynamicOnHoldArtistByState.panchayatName === '') {
      this.dynamicOnHoldArtistByState.panchayatName = 'ALL';
    }

    this.dynamicOnHoldArtistByState.RoleName = this.role;


    this.employeeService.postDynamicHoldListByState(this.dynamicOnHoldArtistByState).subscribe(res => {
      this.listOnHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.listOnHoldData, 'id');
      this.listOnHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.listOnHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  searchRecordByAdmin() {
    this.dynamicOnHoldArtistByState.RoleName = sessionStorage.getItem('role');
    if (this.dynamicOnHoldArtistByState.DistrictId === null || this.dynamicOnHoldArtistByState.DistrictId === undefined) {
      this.dynamicOnHoldArtistByState.DistrictId = 0;
    }
    if (this.dynamicOnHoldArtistByState.panchayatName === null || this.dynamicOnHoldArtistByState.panchayatName === undefined || this.dynamicOnHoldArtistByState.panchayatName === '') {
      this.dynamicOnHoldArtistByState.panchayatName = 'ALL';
    }

    this.dynamicOnHoldArtistByState.RoleName = this.role;


    this.employeeService.postDynamicHoldListByAdmin(this.dynamicOnHoldArtistByState).subscribe(res => {
      this.listOnHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.listOnHoldData, 'id');
      this.listOnHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.listOnHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  selectedPanchyatFromList(res) {
    this.dynamicOnHoldArtistByState.panchayatName = res.PanchyatId;
  }
}
