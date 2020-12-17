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
    private modalService: BsModalService
  ) {

    this.userId = Number(sessionStorage.getItem('userId'));
    this.role = sessionStorage.getItem('role');
    console.log('role', this.role);
    if (this.role === 'GRAMPANCHAYAT') {
      this.displayedColumns = ['artistCode', 'fullName', 'place', 'view', 'approvalStatus', 'action'];
      this.getListOnHoldDataByPachayat(this.userId);
    }
    if (this.role === 'DISTRICT') {
      this.displayedColumns = ['artistCode', 'fullName', 'place', 'view', 'approvalStatus'];
      this.getListOnHoldDataByDistrict(this.userId);
    }
    if (this.role === 'STATE') {
      //state
      this.displayedColumns = ['artistCode', 'fullName', 'place', 'view', 'approvalStatus'];
      this.getDistrictMasterData();
      this.getOnHoldArtistDataByState();
    }

    this.emitterService.isPanchyatArtistPuttedOnHold.subscribe(val => {
      if (val) {
        if (this.role === 'GRAMPANCHAYAT') {
          this.getListOnHoldDataByPachayat(this.userId);
        }
        if (this.role === 'DISTRICT') {
          this.getListOnHoldDataByDistrict(this.userId);
        }
        else {
          //state
          this.getDistrictMasterData();
          this.getOnHoldArtistDataByState();
        }
      }
    });
  }

  ngOnInit(): void {
    this.getStatusMaster();
  }

  getListOnHoldDataByDistrict(userId) {
    this.employeeService.getOnHoldAtDistrict(userId).subscribe(res => {
      this.listOnHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.listOnHoldData, 'id');
      this.listOnHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.listOnHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getListOnHoldDataByPachayat(userId) {
    this.employeeService.getOnHoldAtPanchayat(userId).subscribe(res => {
      this.listOnHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.listOnHoldData, 'id');
      this.listOnHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.listOnHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getOnHoldArtistDataByState() {
    this.employeeService.getReqToHoldAtState().subscribe(res => {
      this.listOnHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.listOnHoldData, 'id');
      this.listOnHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.listOnHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  viewEmployee(employee) {
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
    console.log('artistResponse', this.artistResponse);
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.reqToPutOnHoldByPanchayat.id = Number(this.artistResponse.id);
    this.reqToPutOnHoldByPanchayat.statusId = Number(this.reqToRemoveFromHoldByPanchayat);
    this.reqToPutOnHoldByPanchayat.userId = this.userId;
    console.log(this.reqToPutOnHoldByPanchayat);

    this.employeeService.postReqToPutOnHoldByPanchayat(this.reqToPutOnHoldByPanchayat).subscribe(res => {
      console.log(res, 'res');
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
      // this.submittedByPanchayat = this.statusMaster[12].StatusId;
      // console.log('3', this.statusMaster[3]);
      console.log('13', this.statusMaster[13]);

    });
  }

  getDistrictMasterData() {
    this.employeeService.getDistrictMasterData().subscribe(res => {
      this.districtData = res;
      console.log('district data', this.districtData);
    });
  }

  selectedDistrictFromList(district) {
    this.dynamicOnHoldArtistByState.DistrictId = district.DistrictId;
    this.employeeService.getPanchayatBasedOnDistrictId(this.dynamicOnHoldArtistByState.DistrictId).subscribe(res => {
      this.panchayatData = res;
    });
    //   this.dynamicStateApproved.panchayatName = '';
    // }
  }



  searchRecord() {
      console.log(this.dynamicOnHoldArtistByState);
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

  selectedPanchyatFromList(res) {
    this.dynamicOnHoldArtistByState.panchayatName = res.PanchyatId;
  }
}
