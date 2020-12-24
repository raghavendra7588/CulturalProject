import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApprovalForEditByDistrict, NewProposalBL, OnApprovArtistByDistrict, OnHoldArtistByDistrict, OnHoldProposalForm, PersonalDetails, ReqToHoldArtistToHold, ReqToPutOnHoldByPanchayat, ReqToRemoveFromHoldToApproved, ReqToRemoveFromHoldToholdByDistrict } from '../employees.model';
import { EmployeesService } from '../employees.service'
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EmitterService } from 'src/app/shared/emitter.service';

import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { DialogApprovArtistComponent } from '../dialog-approv-artist/dialog-approv-artist.component';

import { Router, NavigationEnd } from "@angular/router";
import { ReasonForRejectionComponent } from '../reason-for-rejection/reason-for-rejection.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-dialog-view-proposal-form',
  templateUrl: './dialog-view-proposal-form.component.html',
  styleUrls: ['./dialog-view-proposal-form.component.css'],
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




export class DialogViewProposalFormComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;
  savePersonalDetailsForm: FormGroup;
  personalDetailsData: any = [];
  personalDetails: PersonalDetails = new PersonalDetails();
  maxLengthPhone = 10;
  maxLengthPinCode = 6;
  maxLengthAadharCard = 12;
  maxLengthPanCard = 10;
  maxLengthAccountNumber = 18;
  maxLengthIfsc = 11;
  maxDate: any;

  strGender: string;
  genderArray: string[] = ['Male', 'Female'];

  documentProof: any = [];
  illnessHandicaped: any = [];
  govermentBeneficiaryPlan: any = [];

  isDateOfBirthProof: boolean = false;
  isMaharashtraResidentProof: boolean = false;
  isAnnualIncomeProof: boolean = false;
  isIllnessHandicapedProof: boolean = false;
  isGovtRecognitionProof: boolean = false;
  isCulturalMinistryCertificationProof: boolean = false;
  isSponseredProgramsProof: boolean = false;
  isCollectorNominatedProgramProof: boolean = false;
  isInstitutionRecomendationProof: boolean = false;
  isIndivudualRecommendationProof: boolean = false;
  isGovermentBeneficiaryProof: boolean = false;
  isManualFormProof: boolean = false;
  isNotarisedCertificateOfConfirmationProof: boolean = false;

  dateOfBirthProoFilename: string = null;
  dateOfBirthfileData: File = null;
  dateOfBirthfileName: any;

  maharashtraResidentProoFilename: string = null;
  maharashtraResidentfileData: File = null;
  maharashtraResidentfileName: any;

  annualIncomeProoFilename: string = null;
  annualIncomefileData: File = null;
  annualIncomefileName: any;

  illnessHandicapedProoFilename: string = null;
  illnessHandicapedfileData: File = null;
  illnessHandicapedfileName: any;

  govtRecognitionProoFilename: string = null;
  govtRecognitionfileData: File = null;
  govtRecognitionfileName: any;

  culturalMinistryCertificationProoFilename: string = null;
  culturalMinistryCertificationfileData: File = null;
  culturalMinistryCertificationfileName: any;

  sponseredProgramsProoFilename: string = null;
  sponseredProgramsfileData: File = null;
  sponseredProgramsfileName: any;

  institutionRecomendationProoFilename: string = null;
  institutionRecomendationfileData: File = null;
  institutionRecomendationfileName: any;

  govermentBeneficiaryProoFilename: string = null;
  govermentBeneficiaryfileData: File = null;
  govermentBeneficiaryfileName: any;

  manualFormProoFilename: string = null;
  manualFormfileData: File = null;
  manualFormileName: any;

  myFiles: string[] = [];
  isMarathi: string;
  isEnglish: string;
  preferredLanguage: string = 'true';

  isHandicappedSelected: string = 'false';


  dobFiles: string[] = [];
  maharashtraResidentFiles: string[] = [];
  annualIncomeFiles: string[] = [];
  IllnessFiles: string[] = [];
  govtRecognistionFiles: string[] = [];
  culturalMinistryCertificationFiles: string[] = [];
  sponseredProgramsFiles: string[] = [];
  collectorNominatedProgramParticipationFiles: string[] = [];
  individualRecomendationFiles: string[] = [];
  govtBeneficiaryFiles: string[] = [];
  notarisedCertificateFiles: string[] = [];
  manualFormFiles: string[] = [];

  gradeArray: any = [];

  districtMasterData: any = [];
  artistSystemCode: string;

  fullNameStr: string;
  userId: number;

  newProposal: NewProposalBL = new NewProposalBL();

  isApprovedListRoute: boolean = false;
  isNewApprovalsRoute: boolean;

  isApprovalsOnHoldForDistrict: boolean;
  role: string;
  statusMaster: any = [];
  submittedByPanchayat: number;

  reqToPutOnHoldByDistrict: boolean;
  onHoldArtistByDistrict: OnHoldArtistByDistrict = new OnHoldArtistByDistrict();
  holdByDistrict: number;
  approvedByDistrict: number;

  onApprovArtistByDistrict: OnApprovArtistByDistrict = new OnApprovArtistByDistrict();

  reqToRemoveFromHoldByDistrict: boolean;
  reqToRemoveFromHoldToApproved: ReqToRemoveFromHoldToApproved = new ReqToRemoveFromHoldToApproved();
  reqToRemoveFromHoldToholdByDistrict: ReqToRemoveFromHoldToholdByDistrict = new ReqToRemoveFromHoldToholdByDistrict();


  onHoldProposalForm: OnHoldProposalForm = new OnHoldProposalForm();

  ReqputToPutOnHold: boolean = false;
  requestForHoldByPanchayatStatusId: number;


  approvToEditByDistrict: boolean = false;
  reqToEditByPanchayat: string;

  currentStatusId: number;
  currentStatusName: string;

  approvalForEditByDistrict: ApprovalForEditByDistrict = new ApprovalForEditByDistrict();
  reqToHoldArtistToHold: ReqToHoldArtistToHold = new ReqToHoldArtistToHold();

  reqToPutOnHoldByPanchayat: ReqToPutOnHoldByPanchayat = new ReqToPutOnHoldByPanchayat();

  approvalForEditByDistrictId: number;

  closeButtonOnly: boolean = false;

  onHoldByDistrict: number;

  apprvoedByDistrictStr: string = '	APPROVED BY DISTRICT';
  reqToRemoveFromHoldByPanchayat: number;

  selectedProposalFormId: number;
  uploadedDocumentsData: any = [];

  dataSource: any;
  displayedColumns: string[] = ['fileType', 'filePath'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    public employeeService: EmployeesService,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogViewProposalFormComponent>,
    public emitterService: EmitterService,
    private modalService: BsModalService,
    private router: Router
  ) {

    this.savePersonalDetailsForm = this.formBuilder.group({
      artistSystemCode: ['',],
      firstname: ['', [Validators.required]],
      middlename: [''],
      lastname: [''],
      fullname: [''],
      dob: [''],

      annualincome: [''],
      arttype: [''],
      periodofworks: [''],
      address: [''],
      taluka: [''],
      district: [''],

      contactnoone: [''],
      contactnotwo: [''],

      aadharno: [''],
      panno: [''],
      spousename: [''],

      accountname: [''],
      accountnumber: [''],
      bankname: [''],
      ifsccode: [''],
      city: [''],
      gender: [''],
      currentAge: [''],
      familyMemberCount: [''],
      dependentFamilyMemberCount: [''],
      religion: [''],
      caste: [''],
      workDetails: [''],
      artLocations: [''],
      place: [''],
      applicationDate: [''],
      dobProof: [''],
      maharashtraResidentProof: [''],
      annualIncomeProof: [''],
      illHandicapedCheck: [''],
      illHandicapedProof: [''],
      publicationsGovtRecognistionProof: [''],
      culturalMinsitryCertificationProof: [''],
      sponseredDocumentsProof: [''],
      collectorNominatedParticipationProof: [''],
      institutionRecomendationProof: [''],
      notarisedCertificateOfConfirmationProof: [''],
      beneficiaryBenefitPlanProof: [''],
      manualFormProof: [''],
      documentUpload: [''],
      fileUpload: [''],
      financialBenefitCheck: [''],
      financialBenefitReceived: [''],
      pinCode: [''],
      artistPhotographProof: [''],
      nomineePhotographProof: [''],
      bankAccountConfirmationProof: [''],
      otherDocuments: [''],
      reasonToRequestToHold: [''],
      reasonForApprovedToEditByDistrict: [''],
      reasonToRemoveFromHoldByDistrict: [''],
      reasonToHoldByDistrict: [''],
      reasonForRequestToRemoveFromHoldByPanchayat: ['']
    });

    this.role = sessionStorage.getItem('role');

    this.personalDetailsData = data;

    this.newProposal.id = this.personalDetailsData.id;

    this.maxDate = new Date();

    console.log('this.personalDetailsData.id', this.personalDetailsData.id);
    this.employeeService.getUploadedDocumentsByProposalId(this.personalDetailsData.id).subscribe(res => {
      this.uploadedDocumentsData = res;

      if (this.uploadedDocumentsData.length) { 
        this.dataSource = new MatTableDataSource(this.uploadedDocumentsData);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        console.log(res);
     }

   
    });


    if (this.personalDetailsData && this.role === 'DISTRICT') {
      this.currentStatusId = this.personalDetailsData.StatusId;
      this.currentStatusName = this.personalDetailsData.StatusNamee;
      this.isApprovedListRoute = false;
      this.closeButtonOnly = false;
    }

    if (this.personalDetailsData && this.role === 'GRAMPANCHAYAT') {
      this.currentStatusId = this.personalDetailsData.StatusId;
      this.currentStatusName = this.personalDetailsData.StatusName;

      this.isApprovedListRoute = false;
      this.closeButtonOnly = false;
    }

    if (this.router.url === '/requestToPutOnHold' && this.role === 'GRAMPANCHAYAT') {
      this.isApprovedListRoute = true;
      this.closeButtonOnly = true;
    }




    this.preferredLanguage = sessionStorage.getItem('language');


    this.emitterService.isLanguageChanged.subscribe(val => {
      this.preferredLanguage = sessionStorage.getItem('language');
    });
    this.role = sessionStorage.getItem('role');


    if (this.router.url === '/district/approvedList' || this.router.url === '/panchayat/gradeA' || this.router.url === '/panchayat/gradeB' ||
      this.router.url === '/panchayat/gradeC' || this.router.url === '/panchayat/existingMemberAlteration'
      || this.router.url === '/details/personalDetails') {
      this.isApprovedListRoute = true;
      this.closeButtonOnly = true;
      this.isNewApprovalsRoute = false;
      this.isApprovalsOnHoldForDistrict = false;
    }
    if (this.router.url === '/district/newApprovals' && this.role === 'DISTRICT') {
      this.isNewApprovalsRoute = true;
      this.isApprovedListRoute = false;
      this.isApprovalsOnHoldForDistrict = false;
      this.reqToPutOnHoldByDistrict = false;
    }

    if (this.router.url === '/approvalsOnHold' && this.role === 'DISTRICT') {

      this.isNewApprovalsRoute = false;
      this.isApprovedListRoute = false;
      this.isApprovalsOnHoldForDistrict = true;
      this.reqToPutOnHoldByDistrict = false;
      this.reqToRemoveFromHoldByDistrict = false;
    }


    if (this.router.url === '/onHold' && this.role === 'STATE') {
      this.isApprovedListRoute = true;
      this.closeButtonOnly = true;

    }

    if (this.router.url === '/onHold' && this.role === 'DISTRICT') {
      this.isApprovedListRoute = true;
      this.closeButtonOnly = true;
    }
    if ((this.router.url === '/district/newApprovals' || this.router.url === '/district/approvedList' ||
      this.router.url === '/requestToPutOnHold' || this.router.url === '/onHold' || this.router.url === '/listOfRejectedMembers') && this.role === 'STATE') {
      this.isApprovedListRoute = true;
      this.closeButtonOnly = true;
    }

    if (this.router.url === '/listOfRejectedMembers' && this.role === 'DISTRICT') {
      this.isApprovedListRoute = true;
      this.closeButtonOnly = true;
    }

    if (this.router.url === '/listOfRejectedMembers' && this.role === 'DISTRICT') {
      this.isApprovedListRoute = true;
      this.closeButtonOnly = true;
    }

    if (this.router.url === '/listOfRejectedMembers' && this.role === 'GRAMPANCHAYAT') {
      this.isApprovedListRoute = true;
      this.closeButtonOnly = true;
    }

    if (this.router.url === '/requestToRemoveFromHold' && this.role === 'DISTRICT') {

      this.isNewApprovalsRoute = false;
      this.isApprovedListRoute = false;
      this.isApprovalsOnHoldForDistrict = false;
      this.reqToPutOnHoldByDistrict = false;
      this.reqToRemoveFromHoldByDistrict = true;

    }
    if (this.personalDetailsData.StatusName === 'APPROVED BY DISTRICT' && this.role === 'GRAMPANCHAYAT') {
      this.ReqputToPutOnHold = true;
    }


    let action = sessionStorage.getItem('action');


    this.emitterService.isApproved.subscribe(val => {

      this.dialogRef.close();
    });
  }

  ngOnInit(): void {
    if (this.personalDetailsData) {
      this.assignValues();
      this.personalDetails.id = this.personalDetailsData.id;
    }
    else {
      this.personalDetails.id = "0";
      let val = Math.floor(100000 + Math.random() * 900000);
      this.artistSystemCode = val.toString();
    }
    this.documentProof = [
      { id: 0, title: 'Date of Birth Proof' },
      { id: 1, title: 'Maharashtra Resident Proof' },
      { id: 2, title: 'Annual Income from  Tahasildar Proof' },
      { id: 4, title: 'Publications,Invetations and Govt Recognistion Proof' },
      { id: 5, title: 'Cultural Ministry Certification Proof' },
      { id: 6, title: 'Sponsered Programs Proof' },
      { id: 7, title: 'Collector Nominated Program Participation Proof' },
      { id: 8, title: 'Institution and Individual Recomendation Proof' },
      { id: 9, title: 'Goverment Beneficiary Benfit Plan Proof' },
      { id: 11, title: 'Upload Manual Form Proof' }
    ];

    this.illnessHandicaped = [
      { id: 0, title: 'Yes' },
      { id: 1, title: 'No' }
    ];

    this.govermentBeneficiaryPlan = [
      { id: 0, title: 'Yes' },
      { id: 1, title: 'No' }
    ];

    this.gradeArray = [
      { id: 0, title: 'A' },
      { id: 1, title: 'B' },
      { id: 2, title: 'C' }
    ];
    this.getDistrictMastersData();
    this.savePersonalDetailsForm.controls.financialBenefitReceived.disable();
    this.savePersonalDetailsForm.controls.illHandicapedProof.disable();
    this.savePersonalDetailsForm.controls.notarisedCertificateOfConfirmationProof.disable();

    this.userId = Number(sessionStorage.getItem('userId'));

    this.personalDetails.userId = this.userId;
    this.newProposal.userId = Number(this.userId);

    this.getStatusMaster();
  }



  assignValues() {
    console.log('this.personalDetailsData', this.personalDetailsData);
    this.personalDetails.artistSystemCode = this.personalDetailsData.ArtistSystemCode;
    this.personalDetails.firstName = this.personalDetailsData.FirstName;
    this.personalDetails.middleName = this.personalDetailsData.MiddleName;
    this.personalDetails.lastName = this.personalDetailsData.LastName;
    this.personalDetails.dob = new Date(this.personalDetailsData.DOB);

    this.personalDetails.annualIncome = this.personalDetailsData.AnnualIncome;
    this.personalDetails.artType = this.personalDetailsData.ArtType;
    this.personalDetails.periodOfWork = this.personalDetailsData.PeriodOfWork;
    this.personalDetails.grade = this.personalDetailsData.Grade;
    this.personalDetails.address = this.personalDetailsData.Address;
    this.personalDetails.taluka = this.personalDetailsData.Taluka;
    this.personalDetails.district = this.personalDetailsData.District;
    this.personalDetails.contactNo1 = this.personalDetailsData.ContactNo1;
    this.personalDetails.contactNo2 = this.personalDetailsData.ContactNo2;
    this.personalDetails.aadharNo = this.personalDetailsData.AadharNo;
    this.personalDetails.panNo = this.personalDetailsData.PanNo;
    this.personalDetails.spouseName = this.personalDetailsData.SpouseName;
    this.personalDetails.accountName = this.personalDetailsData.AccountName;

    this.personalDetails.accountNumber = this.personalDetailsData.AccountNumber;
    this.personalDetails.bankName = this.personalDetailsData.BankName;
    this.personalDetails.BankIFSCCode = this.personalDetailsData.BankIFSCCode;
    this.personalDetails.city = this.personalDetailsData.City;
    this.personalDetails.place = this.personalDetailsData.Place;
    this.personalDetails.religion = this.personalDetailsData.Religion;
    this.personalDetails.caste = this.personalDetailsData.Caste;
    this.personalDetails.familyMemberCount = this.personalDetailsData.FamilyMemberCount;
    this.personalDetails.dependentFamilyMemberCount = this.personalDetailsData.DependentFamilyMemberCount;
    this.personalDetails.artLocations = this.personalDetailsData.ArtLocations;
    this.personalDetails.workDetails = this.personalDetailsData.WorkDetails;;
    this.personalDetails.fullname = this.personalDetailsData.FullName;
    this.personalDetails.gender = this.personalDetailsData.Gender;
    this.personalDetails.pinCode = this.personalDetailsData.PinCode;
    this.personalDetails.currentAge = this.personalDetailsData.CurrentAge;
    this.personalDetails.applicationDate = this.personalDetailsData.ApplicationDate;
  }
  valueChanged() {

    let date = new Date(this.personalDetails.dob);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")

    const day = `${date.getDate()}`.padStart(2, "0")

    const stringDate = [day, month, year].join("/");
    const ageCalcultaion = [year, month, day].join("-");

    this.personalDetails.currentAge = this.currentAgeCalculation(ageCalcultaion).toString();
    let fullDate = stringDate;
    return fullDate
  }
  currentAgeCalculation(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);

    const yearsDifference = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      return yearsDifference - 1;
    }
    return yearsDifference
  }

  applicationvalueChanged() {
    let date = new Date(this.personalDetails.applicationDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")

    const day = `${date.getDate()}`.padStart(2, "0")

    const stringDate = [day, month, year].join("/");
    let fullDate = stringDate;
    return fullDate
  }



  selectedHandicapedFromList(response) {
    this.isIllnessHandicapedProof = true;

    let isYesSelected = response.title;
    if (isYesSelected === 'Yes') {
      this.savePersonalDetailsForm.controls.illHandicapedProof.enable();
    }
    else {
      this.savePersonalDetailsForm.controls.illHandicapedProof.disable();
    }


  }

  selectedBeneficiaryFromList(response) {
    let selectedBeneficiaryResponse = response.title;
    if (selectedBeneficiaryResponse === 'Yes') {
      this.savePersonalDetailsForm.controls.financialBenefitReceived.enable();
      this.savePersonalDetailsForm.controls.notarisedCertificateOfConfirmationProof.disable();
    }
    else {
      this.isNotarisedCertificateOfConfirmationProof = true;
      this.savePersonalDetailsForm.controls.financialBenefitReceived.disable();
      this.savePersonalDetailsForm.controls.notarisedCertificateOfConfirmationProof.enable();
    }
  }



  getDOBFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.dobFiles.push(e.target.files[i]);
      this.toastr.success('Date Of Birth Proof Uploaded');
      this.isDateOfBirthProof = true;
    }

  }

  getMahrashtraResidenceFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.maharashtraResidentFiles.push(e.target.files[i]);
      this.toastr.success('Maharashtra Residence Proof Uploaded');
      this.isMaharashtraResidentProof = true;

    }
  }
  getannualIncomeFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.annualIncomeFiles.push(e.target.files[i]);
      this.toastr.success('Annual Income Proof Uploaded');
      this.isAnnualIncomeProof = true;
    }
  }

  getIllHandicapedFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.IllnessFiles.push(e.target.files[i]);
      this.toastr.success('Ill Handicaped Proof Uploaded');
      this.isIllnessHandicapedProof = true;
    }
  }

  getGovtRecognisitionFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.govtRecognistionFiles.push(e.target.files[i]);
      this.toastr.success('Goverment Recognisition Proof Uploaded');
      this.isGovtRecognitionProof = true;
    }
  }

  getCulturalFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.culturalMinistryCertificationFiles.push(e.target.files[i]);
      this.toastr.success('Cultural Ministry Certificate Proof Uploaded');
      this.isCulturalMinistryCertificationProof = true;
    }
  }

  getSponseredFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.sponseredProgramsFiles.push(e.target.files[i]);
      this.toastr.success('Sponsered Programs Proof Uploaded');
      this.isSponseredProgramsProof = true;
    }
  }

  getCollectorNominatedFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.collectorNominatedProgramParticipationFiles.push(e.target.files[i]);
      this.toastr.success('Collector Nominated Proof Uploaded');
      this.isCollectorNominatedProgramProof = true;
    }
  }

  getIndividualInstitutionFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.individualRecomendationFiles.push(e.target.files[i]);
      this.toastr.success('Individual Institution Proof Uploaded');
      this.isIndivudualRecommendationProof = true;
    }
  }

  getGovtBeneficiaryBenefitFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.govtBeneficiaryFiles.push(e.target.files[i]);

      this.toastr.success('Individual Institution Proof Uploaded');
      this.isGovermentBeneficiaryProof = true;
    }
  }

  getNotarisedFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.notarisedCertificateFiles.push(e.target.files[i]);
      this.toastr.success('Notarised Certificate Proof Uploaded');
      this.isNotarisedCertificateOfConfirmationProof = true;
    }
  }

  getManualFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.manualFormFiles.push(e.target.files[i]);
      this.toastr.success('Manual Form Proof Uploaded');
      this.isManualFormProof = true;
    }
  }

  selectedGradefromList(response) {
    let selectedGradeType: string;
    selectedGradeType = response.title;

    if (selectedGradeType === 'A') {
      this.personalDetails.pensionAmountMonthlyBasis = '1400';
      this.personalDetails.pensionAmountYearlyBasis = '16800';
    }
    if (selectedGradeType === 'B') {
      this.personalDetails.pensionAmountMonthlyBasis = '1200';
      this.personalDetails.pensionAmountYearlyBasis = '14400';
    }
    if (selectedGradeType === 'C') {
      this.personalDetails.pensionAmountMonthlyBasis = '1000';
      this.personalDetails.pensionAmountYearlyBasis = '12000';
    }
  }


  getDistrictMastersData() {
    this.employeeService.getDistrictMasterData().subscribe(res => {
      this.districtMasterData = res;
    });
  }

  selectedDistrictFromList(response) {
    let districtObj = response;
    let filteredString = districtObj.DistrictName.substring(0, 4);
    this.personalDetails.artistSystemCode = 'MH' + filteredString + '-' + this.artistSystemCode;

  }


  approvArtist(artist) {
    this.dialog.open(DialogApprovArtistComponent, {
      height: '155px',
      width: '1200px',
      data: this.personalDetailsData,
      disableClose: true
    });
  }

  rejectArtist(artist) {
    this.dialog.open(ReasonForRejectionComponent, {
      height: '155px',
      width: '500px',
      data: this.personalDetailsData,
      disableClose: true
    });
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.newProposal.grade = "";
    this.newProposal.status = "REJECTED";
    this.employeeService.updateNewProposalFormData(this.newProposal).subscribe(res => {
      this.toastr.error('Rejected Successfully');
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
      this.submittedByPanchayat = this.statusMaster[4].StatusId;


      this.holdByDistrict = this.statusMaster[7].StatusId;
      this.approvedByDistrict = this.statusMaster[5].StatusId;
      this.requestForHoldByPanchayatStatusId = this.statusMaster[12].StatusId;
      this.onHoldByDistrict = this.statusMaster[7].StatusId;


      this.approvalForEditByDistrictId = this.statusMaster[14].StatusId;
      this.reqToRemoveFromHoldByPanchayat = this.statusMaster[13].StatusId;
    });
  }

  confirmHold() {

    this.onHoldArtistByDistrict.id = Number(this.personalDetailsData.id);
    this.onHoldArtistByDistrict.userId = Number(this.userId);
    this.onHoldArtistByDistrict.statusId = this.holdByDistrict;

    this.employeeService.postArtistToHoldByDistrict(this.onHoldArtistByDistrict).subscribe(res => {
      this.toastr.success('On Holded Successfully');
      this.emitterService.isApproved.emit(true);
      this.dialogRef.close();
    });
  }



  releaseHold() {
    this.onApprovArtistByDistrict.id = Number(this.personalDetailsData.id);
    this.onApprovArtistByDistrict.userId = Number(this.userId);
    this.onApprovArtistByDistrict.statusId = this.approvedByDistrict;
    this.onApprovArtistByDistrict.ApprovedByDistrict = Number(this.userId);

    this.employeeService.postArtistToApprovByDistrict(this.onApprovArtistByDistrict).subscribe(res => {
      this.toastr.success('On Approved Successfully');
      this.emitterService.isApproved.emit(true);
      this.dialogRef.close();
    });
  }

  removeHold() {
    this.reqToRemoveFromHoldToApproved.id = Number(this.personalDetailsData.id);
    this.reqToRemoveFromHoldToApproved.statusId = this.approvedByDistrict;
    this.reqToRemoveFromHoldToApproved.userId = Number(this.userId);

    this.reqToRemoveFromHoldToApproved.ReasonForApprovedForGetReqToReleaseActionByDistrict = this.personalDetails.reasonToRemoveFromHoldByDistrict;
    this.employeeService.postArtistToReqToHoldToApprovByDistrict(this.reqToRemoveFromHoldToApproved).subscribe(res => {
      this.toastr.success('On Approved Successfully');
      this.emitterService.isApproved.emit(true);
      this.dialogRef.close();
    });
  }

  putOnHold() {
    this.reqToRemoveFromHoldToholdByDistrict.id = Number(this.personalDetailsData.id);
    this.reqToRemoveFromHoldToholdByDistrict.statusId = this.holdByDistrict;
    this.reqToRemoveFromHoldToholdByDistrict.userId = Number(this.userId);

    this.employeeService.postArtistToReqToHoldToHoldByDistrict(this.reqToRemoveFromHoldToholdByDistrict).subscribe(res => {
      this.toastr.success('On Holded Successfully');
      this.emitterService.isApproved.emit(true);
      this.dialogRef.close();
    });
  }

  openModalForReqToPutOnHold(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmForReqToPutOnHold(): void {
    this.message = 'Confirmed!';
    this.onHoldProposalForm.id = this.personalDetailsData.id;
    this.onHoldProposalForm.userId = this.userId;
    this.onHoldProposalForm.statusId = this.requestForHoldByPanchayatStatusId;
    this.onHoldProposalForm.ReasonForRequestToPutOnHold = this.personalDetails.reasonForRequestToPutOnHold;

    this.employeeService.postOnHoldByPanchayat(this.onHoldProposalForm).subscribe(res => {
      this.toastr.success('Artist OnHolded Successfully');
      this.emitterService.isPanchyatArtistPuttedOnHold.emit(true);
      this.dialogRef.close();
    });
    this.modalRef.hide();
  }

  declineForReqToPutOnHold(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  openModalForApprovForEditByDistricT(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

  }

  confirmForEditByDistrict(): void {

    this.approvalForEditByDistrict.id = Number(this.personalDetailsData.id);
    this.approvalForEditByDistrict.statusId = Number(this.approvedByDistrict);
    this.approvalForEditByDistrict.userId = Number(this.userId);
    this.approvalForEditByDistrict.ReasonForApprovedForEditByDistrict = this.personalDetails.reasonForApprovedToEditByDistrict;



    this.employeeService.postApprovToEditByDistrict(this.approvalForEditByDistrict).subscribe(res => {
      this.toastr.success('Approved For Edit Successfully');
      this.emitterService.isApproved.emit(true);
      this.dialogRef.close();
    });

    this.modalRef.hide();
  }

  declineForEditByDistrict(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }



  HoldArtistByDistrict() {
    this.reqToHoldArtistToHold.id = Number(this.personalDetailsData.id);
    this.reqToHoldArtistToHold.StatusId = Number(this.onHoldByDistrict);
    this.reqToHoldArtistToHold.userId = Number(this.userId);
    this.reqToHoldArtistToHold.ReasonForApprovedForGetReqToHoldActionByDistrict = this.personalDetails.reasonToHoldByDistrict;

    this.employeeService.postApprovToHoldToHoldByDistrict(this.reqToHoldArtistToHold).subscribe(res => {
      this.toastr.success('Holded Artist Successfully');
      this.emitterService.isApproved.emit(true);
      this.dialogRef.close();
    });

    this.modalRef.hide();
  }

  ReqToRemoveFromHoldByPanchayat() {
    this.reqToPutOnHoldByPanchayat.id = Number(this.personalDetailsData.id);
    this.reqToPutOnHoldByPanchayat.statusId = Number(this.reqToRemoveFromHoldByPanchayat);
    this.reqToPutOnHoldByPanchayat.userId = this.userId;
    this.reqToPutOnHoldByPanchayat.ReasonForReqToPutOnHoldByPanchayat = this.personalDetails.reasonForRequestToRemoveFromHoldByPanchayat;
    this.employeeService.postReqToPutOnHoldByPanchayat(this.reqToPutOnHoldByPanchayat).subscribe(res => {
      this.toastr.success('Requested Successfully');
      this.emitterService.isApproved.emit(true);
      this.emitterService.isPanchyatArtistPuttedOnHold.emit(true);
    });


  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}
