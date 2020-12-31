import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { EmployeesService } from '../employees.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OnHoldProposalForm } from '../employees.model';
import { ToastrService } from 'ngx-toastr';
import { DialogPersonalDetailComponent } from '../dialog-personal-detail/dialog-personal-detail.component';
import { DialogPersonalDetailsEditComponent } from '../dialog-personal-details-edit/dialog-personal-details-edit.component';

@Component({
  selector: 'app-approved-list-panchayat',
  templateUrl: './approved-list-panchayat.component.html',
  styleUrls: ['./approved-list-panchayat.component.css']
})
export class ApprovedListPanchayatComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;

  dataSource: any;
  displayedColumns: string[] = ['artistCode', 'fullName', 'place', 'approvalStatus', 'approvedBy', 'approvedByAt', 'view', 'edit', 'hold'];
  approvedListData: any = [];

  districtId: number;
  userId: number;
  statusMaster: any = [];
  submittedByPanchayat: number;
  selectedArtist: any;
  onHoldProposalForm: OnHoldProposalForm = new OnHoldProposalForm();

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    private modalService: BsModalService,
    public toastr: ToastrService
  ) {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.districtId = parseInt(sessionStorage.getItem('DistrictId'));
    this.userId = parseInt(sessionStorage.getItem('userId'));
    this.onHoldProposalForm.userId = this.userId;
    this.onHoldProposalForm.updatedBy = this.userId;

    this.emitterService.isPanchyatArtistPuttedOnHold.subscribe(val => {
      if (val) {
        this.getApprovedListData(this.userId);
      }
    });
  }

  ngOnInit(): void {
    this.getApprovedListData(this.userId);
    this.getStatusMaster();
  }


  getApprovedListData(userId) {
    this.employeeService.getApprovedListPanchayat(userId).subscribe(res => {
      this.approvedListData = res;
      this.dataSource = new MatTableDataSource(this.approvedListData);
    });
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  viewEmployee(response) {
    sessionStorage.removeItem('action');
    sessionStorage.setItem('action', 'viewByPanchayat');
    let res: any = [];
    res = response;
    this.dialog.open(DialogViewProposalFormComponent, {
      height: '600px',
      width: '1200px',
      data: res,
      disableClose: false
    });
  }

  editUser(res: any) {
    sessionStorage.removeItem('action');
    sessionStorage.setItem('action', 'editByPanchayat');
    this.dialog.open(DialogPersonalDetailsEditComponent, {
      height: '700px',
      width: '1200px',
      data: res,
      disableClose: false
    });
    
  }

  onHoldEmployee(res) {
    sessionStorage.removeItem('action');
    sessionStorage.setItem('action', 'onHoldByPanchayat');

    this.dialog.open(DialogViewProposalFormComponent, {
      height: '600px',
      width: '1200px',
      data: res,
      disableClose: false
    });
  }

  getStatusMaster() {
    this.employeeService.getStatusMasterData().subscribe(res => {
      this.statusMaster = res;
      this.submittedByPanchayat = this.statusMaster[12].StatusId;
      this.onHoldProposalForm.statusId = this.submittedByPanchayat;
    });
  }


  openModal(template: TemplateRef<any>, selectedArtist) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.selectedArtist = selectedArtist;
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.onHoldProposalForm.id = this.selectedArtist.id;
    this.employeeService.postOnHoldByPanchayat(this.onHoldProposalForm).subscribe(res => {
      this.toastr.success('Artist OnHolded Successfully');
      this.emitterService.isPanchyatArtistPuttedOnHold.emit(true);
    });
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}

