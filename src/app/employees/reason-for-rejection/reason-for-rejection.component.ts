import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { NewProposalBL, ProposalFormRejection } from '../employees.model';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-reason-for-rejection',
  templateUrl: './reason-for-rejection.component.html',
  styleUrls: ['./reason-for-rejection.component.css']
})
export class ReasonForRejectionComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;
  artistResponse: any;
  newProposal: NewProposalBL = new NewProposalBL();
  userId: string;
  gradeArray: any = [];
  artistId: number;
  userIdnum: number;
  statusMaster: any;
  submittedByPanchayat: number;

  rejectStatusCode: number;

  constructor(
    public dialog: MatDialog,
    public emitterService: EmitterService,
    public employeeService: EmployeesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalService: BsModalService,
    private dialogRef: MatDialogRef<ReasonForRejectionComponent>,
    public toastr: ToastrService,
  ) {
    this.artistResponse = data;
    this.newProposal.id = this.artistResponse.id;
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.userIdnum = Number(sessionStorage.getItem('userId'));
    this.newProposal.userId = Number(this.userId);
    this.getStatusMaster();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.newProposal.id = this.artistResponse.id;
    this.newProposal.StatusId = this.rejectStatusCode;
    this.newProposal.reasonForRejection = this.newProposal.reasonForRejection;
    this.newProposal.RejectedByDistrict = Number(this.userId);




    this.employeeService.postRejectArtistByDistrict(this.newProposal).subscribe(res => {
      this.toastr.success('Status Updated');
      this.emitterService.isApproved.emit(true);
      this.dialogRef.close();
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
      this.rejectStatusCode = this.statusMaster[6].StatusId;
    });
  }

}
