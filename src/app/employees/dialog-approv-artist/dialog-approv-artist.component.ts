import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EmitterService } from 'src/app/shared/emitter.service';
import { EmployeesService } from '../employees.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NewProposal, NewProposalBL } from '../employees.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-approv-artist',
  templateUrl: './dialog-approv-artist.component.html',
  styleUrls: ['./dialog-approv-artist.component.css']
})
export class DialogApprovArtistComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;
  artistResponse: any;
  // newProposal: NewProposal = new NewProposal();
  newProposal: NewProposalBL = new NewProposalBL();
  userId: string;
  gradeArray: any = [];
  artistId: number;
  statusMaster: any;
  submittedByPanchayat: number;
  intUserId: number;

  constructor(
    public dialog: MatDialog,
    public emitterService: EmitterService,
    public employeeService: EmployeesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalService: BsModalService,
    private dialogRef: MatDialogRef<DialogApprovArtistComponent>,
    public toastr: ToastrService,
  ) {


    this.artistResponse = data;
    this.newProposal.id = this.artistResponse.id;
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.intUserId = Number(sessionStorage.getItem('userId'));
    this.getStatusMaster();
    this.newProposal.userId = Number(this.userId);
    this.gradeArray = [
      { id: 0, title: 'A' },
      { id: 1, title: 'B' },
      { id: 2, title: 'C' }
    ];
  }




  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';

    this.newProposal.status = 'APPROVED';
    this.newProposal.statusCode = this.submittedByPanchayat;
    this.newProposal.reasonForRejection = "";
    this.newProposal.updatedBy = this.intUserId;
    this.newProposal.approvedByDistrict = this.intUserId;
    this.employeeService.updateNewProposalFormData(this.newProposal).subscribe(res => {
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

  selectedGradefromList(response) {
    let selectedGradeType: string;
    selectedGradeType = response.title;

    if (selectedGradeType === 'A') {
      this.newProposal.monthlyPension = '1400';
      this.newProposal.yearlyPension = '16800';
    }
    if (selectedGradeType === 'B') {
      this.newProposal.monthlyPension = '1200';
      this.newProposal.yearlyPension = '14400';
    }
    if (selectedGradeType === 'C') {
      this.newProposal.monthlyPension = '1000';
      this.newProposal.yearlyPension = '12000';
    }
  }
  // assignData() {
  //   if (this.artistResponse) {
  //     this.newProposal.aadharNo = this.artistResponse.AadharNo;
  //     this.newProposal.accountName = this.artistResponse.AccountName;
  //     this.newProposal.accountNumber = this.artistResponse.AccountNumber;
  //     this.newProposal.annualIncome = this.artistResponse.AnnualIncome;
  //     this.newProposal.applicationDate = this.artistResponse.ApplicationDate;

  //     this.newProposal.artLocations = this.artistResponse.ArtLocations;
  //     this.newProposal.artType = this.artistResponse.ArtType;
  //     this.newProposal.artistSystemCode = this.artistResponse.ArtistSystemCode;
  //     this.newProposal.BankIFSCCode = this.artistResponse.BankIFSCCode;
  //     this.newProposal.bankName = this.artistResponse.BankName;

  //     this.newProposal.caste = this.artistResponse.Caste;
  //     this.newProposal.city = this.artistResponse.City;
  //     this.newProposal.contactNo1 = this.artistResponse.ContactNo1;
  //     this.newProposal.contactNo2 = this.artistResponse.ContactNo2;
  //     this.newProposal.dob = this.artistResponse.DOB;

  //     this.newProposal.dependentFamilyMemberCount = this.artistResponse.DependentFamilyMemberCount;
  //     this.newProposal.district = this.artistResponse.District;
  //     this.newProposal.familyMemberCount = this.artistResponse.FamilyMemberCount;
  //     this.newProposal.fullname = this.artistResponse.FullName;
  //     this.newProposal.gender = this.artistResponse.Gender;

  //     this.newProposal.lastName = this.artistResponse.LastName;
  //     this.newProposal.middleName = this.artistResponse.MiddleName;
  //     this.newProposal.panNo = this.artistResponse.PanNo;
  //     this.newProposal.periodOfWork = this.artistResponse.PeriodOfWork;
  //     this.newProposal.pinCode = this.artistResponse.PinCode;



  //     this.newProposal.place = this.artistResponse.Place;
  //     this.newProposal.religion = this.artistResponse.Religion;
  //     this.newProposal.spouseName = this.artistResponse.SpouseName;
  //     this.newProposal.status = this.artistResponse.Status;
  //     this.newProposal.taluka = this.artistResponse.Taluka;

  //     // this.newProposal.aadharNo = this.artistResponse.UserId;
  //     this.newProposal.workDetails = this.artistResponse.WorkDetails;
  //     // this.newProposal.aadharNo = this.artistResponse.createdAt;
  //   }
  //   else {
  //     return;
  //   }
  // }

  getStatusMaster() {
    this.employeeService.getStatusMasterData().subscribe(res => {

      this.statusMaster = res;
      this.submittedByPanchayat = this.statusMaster[5].StatusId;
      console.log('5', this.statusMaster[5]);
      console.log('5', this.submittedByPanchayat);
    });
  }
} 
