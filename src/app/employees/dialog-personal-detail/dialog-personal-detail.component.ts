import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PersonalDetails } from '../employees.model';
import { EmployeesService } from '../employees.service'
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmitterService } from 'src/app/shared/emitter.service';

import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-personal-detail',
  templateUrl: './dialog-personal-detail.component.html',
  styleUrls: ['./dialog-personal-detail.component.css'],
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
export class DialogPersonalDetailComponent implements OnInit {

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
  minDate: any;

  strGender: string;
  genderArray: string[] = ['Male', 'Female'];

  documentProof: any = [];
  illnessHandicaped: any = [];
  govermentBeneficiaryPlan: any = [];

  isDateOfBirthProof: boolean = false;
  isMaharashtraResidentProof: boolean = false;
  isAnnualIncomeProof: boolean = false;
  isGovermentBeneficiaryProof: boolean = false;

  isArtistPhotographProof: boolean = false;
  isNomineePhotographProof: boolean = false;
  isBankAccountConfirmationProof = false;
  isManualFormProof: boolean = false;

  isIllnessHandicapedProof: boolean = false;
  isGovtRecognitionProof: boolean = false;
  isCulturalMinistryCertificationProof: boolean = false;
  isSponseredProgramsProof: boolean = false;
  isCollectorNominatedProgramProof: boolean = false;
  isInstitutionRecomendationProof: boolean = false;
  isIndivudualRecommendationProof: boolean = false;


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


  dobFiles: any[] = [];
  maharashtraResidentFiles: any[] = [];
  annualIncomeFiles: any[] = [];
  govtBeneficiaryFiles: any[] = [];
  artistPhotographFiles: any[] = [];
  nomineePhotographFiles: any[] = [];
  bankAccountConfimationFiles: any[] = [];

  IllnessFiles: any[] = [];
  govtRecognistionFiles: any[] = [];
  culturalMinistryCertificationFiles: any[] = [];
  sponseredProgramsFiles: any[] = [];
  collectorNominatedProgramParticipationFiles: any[] = [];
  individualRecomendationFiles: any[] = [];

  notarisedCertificateFiles: any[] = [];
  otherDocumentsFiles: any = [] = [];
  manualFormFiles: any[] = [];

  gradeArray: any = [];

  districtMasterData: any = [];
  artistSystemCode: string;

  fullNameStr: string;
  userId: number;
  districtId: number;
  isViewSelected: boolean;

  statusMaster: any = [];
  submittedByPanchayat: number;
  onHoldAtDistrict: number;

  isExisitingEdit: boolean = false;
  reqForEditForPanchayat: number;
  isFormSubmitted: boolean = false;


  submittedProposalFormId: number;
  documentrTypeStr: string = '';
  files: any = [];
  fullDate: any;

  constructor(
    public formBuilder: FormBuilder,
    public employeeService: EmployeesService,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogPersonalDetailComponent>,
    public emitterService: EmitterService,
    private router: Router
  ) {
    this.personalDetailsData = data;

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
      reasonForEdit: ['']
    });
    this.districtId = Number(sessionStorage.getItem('DistrictId'));

    this.maxDate = new Date();
    this.minDate = new Date();
    this.preferredLanguage = sessionStorage.getItem('language');
    this.emitterService.isLanguageChanged.subscribe(val => {
      this.preferredLanguage = sessionStorage.getItem('language');
    });

    let getAction = sessionStorage.getItem('action');
    if (this.router.url === '/panchayat/approvedList' && getAction === 'editByPanchayat') {
      this.isExisitingEdit = true;
    }
  }

  ngOnInit(): void {
    this.getDistrictMastersData(this.districtId);
    if (this.personalDetailsData) {
      setTimeout(() => {
        this.assignValues();
      }, 3000);

      this.personalDetails.id = this.personalDetailsData.id;
      this.isViewSelected = true;
    }
    else {
      this.personalDetails.id = "0";
      let val = Math.floor(100000 + Math.random() * 900000);
      this.artistSystemCode = val.toString();
      this.isViewSelected = false;
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
      { id: 11, title: 'Upload Manual Form Proof' },
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

    //this.savePersonalDetailsForm.controls.financialBenefitReceived.disable();
    this.savePersonalDetailsForm.controls.illHandicapedProof.disable();
    this.savePersonalDetailsForm.controls.notarisedCertificateOfConfirmationProof.disable();
    this.userId = Number(sessionStorage.getItem('userId'));
    this.personalDetails.userId = this.userId;
    this.getStatusMaster();
    let applicationDate = new Date();
    let formattedDate = moment(applicationDate).format('DD/MM/YYYY');

    this.personalDetails.applicationDate = formattedDate;

    this.personalDetails.place = sessionStorage.getItem('panchayatName');
    this.disableFileUploadingControls();
  }


  saveEmployee() {
    const formData = new FormData();
    if (this.personalDetailsData) {

      this.personalDetails.id = this.personalDetails.id;
      formData.append('id', this.personalDetails.id.toString());
      formData.append('statusId', this.reqForEditForPanchayat.toString());
      this.personalDetails.status = "REQ FOR EDIT BY PANCHAYAT";
      formData.append('status', this.personalDetails.status);
      formData.append('editByPanchayat', this.userId.toString());

      formData.append('updatedBy', this.userId.toString());
    }
    else {
      this.personalDetails.id = "0"
      formData.append('id', this.personalDetails.id.toString());
      formData.append('statusId', this.submittedByPanchayat.toString());
      this.personalDetails.status = "PENDING";
      formData.append('status', this.personalDetails.status);
    }

    if (this.personalDetails.firstName === null || this.personalDetails.firstName === undefined || this.personalDetails.firstName === '') {
      this.personalDetails.firstName = "";
      formData.append('firstName', '');
    }
    else {
      formData.append('firstName', this.personalDetails.firstName);
    }

    if (this.personalDetails.middleName === null || this.personalDetails.middleName === undefined || this.personalDetails.middleName === '') {
      this.personalDetails.middleName = "";
      formData.append('middleName', '');
    }
    else {
      formData.append('middleName', this.personalDetails.middleName);
    }

    if (this.personalDetails.lastName === null || this.personalDetails.lastName === undefined || this.personalDetails.lastName === '') {
      this.personalDetails.lastName = "";
      formData.append('lastName', '');
    }
    else {
      formData.append('lastName', this.personalDetails.lastName);
    }

    if (this.personalDetails.dob === null || this.personalDetails.dob === undefined || this.personalDetails.dob === '') {
      this.personalDetails.dob = "";
      formData.append('dob', '');
    }
    else {
      // let fullDate;
      // fullDate = this.valueChanged();
      // this.personalDetails.dob = fullDate.toString();
      
      this.fullDate = this.valueChanged();
      formData.append('dob', this.fullDate.toString());
    }

    if (this.personalDetails.annualIncome === null || this.personalDetails.annualIncome === undefined || this.personalDetails.annualIncome === '') {
      this.personalDetails.annualIncome = "";
      formData.append('annualIncome', '');
    }
    else {
      formData.append('annualIncome', this.personalDetails.annualIncome);
    }

    if (this.personalDetails.artType === null || this.personalDetails.artType === undefined || this.personalDetails.artType === '') {
      this.personalDetails.artType = "";
      formData.append('artType', '');
    }
    else {
      formData.append('artType', this.personalDetails.artType);
    }

    if (this.personalDetails.periodOfWork === null || this.personalDetails.periodOfWork === undefined || this.personalDetails.periodOfWork === '') {
      this.personalDetails.periodOfWork = "";
      formData.append('periodOfWork', '');
    }
    else {
      formData.append('periodOfWork', this.personalDetails.periodOfWork);
    }



    if (this.personalDetails.address === null || this.personalDetails.address === undefined || this.personalDetails.address === '') {
      this.personalDetails.address = "";
      formData.append('address', '');
    }
    else {
      formData.append('address', this.personalDetails.address);
    }


    if (this.personalDetails.taluka === null || this.personalDetails.taluka === undefined || this.personalDetails.taluka === '') {
      this.personalDetails.taluka = "";
      formData.append('taluka', '');
    }
    else {
      formData.append('taluka', this.personalDetails.taluka);
    }

    if (this.personalDetails.district === null || this.personalDetails.district === undefined) {
      formData.append('district', '0');
    }

    else {
      formData.append('district', this.personalDetails.district.toString());
    }

    if (this.personalDetails.contactNo1 === null || this.personalDetails.contactNo1 === undefined || this.personalDetails.contactNo1 === '') {
      this.personalDetails.contactNo1 = "";
      formData.append('contactNo1', '');
    }
    else {
      formData.append('contactNo1', this.personalDetails.contactNo1);
    }


    if (this.personalDetails.contactNo2 === null || this.personalDetails.contactNo2 === undefined || this.personalDetails.contactNo2 === '') {
      this.personalDetails.contactNo2 = "";
      formData.append('contactNo2', '');
    }
    else {
      formData.append('contactNo2', this.personalDetails.contactNo2);
    }


    if (this.personalDetails.aadharNo === null || this.personalDetails.aadharNo === undefined || this.personalDetails.aadharNo === '') {
      this.personalDetails.aadharNo = "";
      formData.append('aadharNo', '');
    }
    else {
      formData.append('aadharNo', this.personalDetails.aadharNo);
    }


    if (this.personalDetails.panNo === null || this.personalDetails.panNo === undefined || this.personalDetails.panNo === '') {
      this.personalDetails.panNo = "";
      formData.append('panNo', '');
    }
    else {
      formData.append('panNo', this.personalDetails.panNo);
    }


    if (this.personalDetails.spouseName === null || this.personalDetails.spouseName === undefined || this.personalDetails.spouseName === '') {
      this.personalDetails.spouseName = "";
      formData.append('spouseName', '');
    }
    else {
      formData.append('spouseName', this.personalDetails.spouseName);
    }



    if (this.personalDetails.accountName === null || this.personalDetails.accountName === undefined || this.personalDetails.accountName === '') {
      this.personalDetails.accountName = "";
      formData.append('accountName', '');
    }
    else {
      formData.append('accountName', this.personalDetails.accountName);
    }

    if (this.personalDetails.accountNumber === null || this.personalDetails.accountNumber === undefined || this.personalDetails.accountNumber === '') {
      this.personalDetails.accountNumber = "";
      formData.append('accountNumber', '');
    }
    else {
      formData.append('accountNumber', this.personalDetails.accountNumber);
    }

    if (this.personalDetails.bankName === null || this.personalDetails.bankName === undefined || this.personalDetails.bankName === '') {
      this.personalDetails.bankName = "";
      formData.append('bankName', '');
    }
    else {
      formData.append('bankName', this.personalDetails.bankName);
    }


    if (this.personalDetails.BankIFSCCode === null || this.personalDetails.BankIFSCCode === undefined || this.personalDetails.BankIFSCCode === '') {
      this.personalDetails.BankIFSCCode = "";
      formData.append('BankIFSCCode', '');
    }
    else {
      formData.append('BankIFSCCode', this.personalDetails.BankIFSCCode);
    }


    if (this.personalDetails.city === null || this.personalDetails.city === undefined || this.personalDetails.city === '') {
      this.personalDetails.city = "";
      formData.append('city', '');
    }
    else {
      formData.append('city', this.personalDetails.city);
    }

    if (this.personalDetails.pinCode === null || this.personalDetails.pinCode === undefined) {
      this.personalDetails.pinCode = 0;
      formData.append('pinCode', '0');
    }
    else {
      formData.append('pinCode', this.personalDetails.pinCode.toString());
    }


    if (this.personalDetails.religion === null || this.personalDetails.religion === undefined || this.personalDetails.religion === '') {
      this.personalDetails.religion = "";
      formData.append('religion', '');
    }
    else {
      formData.append('religion', this.personalDetails.religion);
    }

    if (this.personalDetails.caste === null || this.personalDetails.caste === undefined || this.personalDetails.caste === '') {
      this.personalDetails.caste = "";
      formData.append('caste', '');
    }
    else {
      formData.append('caste', this.personalDetails.caste);
    }

    if (this.personalDetails.familyMemberCount === null || this.personalDetails.familyMemberCount === undefined || this.personalDetails.familyMemberCount === '') {
      this.personalDetails.familyMemberCount = "";
      formData.append('familyMemberCount', '');
    }
    else {
      formData.append('familyMemberCount', this.personalDetails.familyMemberCount);
    }

    if (this.personalDetails.dependentFamilyMemberCount === null || this.personalDetails.dependentFamilyMemberCount === undefined || this.personalDetails.dependentFamilyMemberCount === '') {
      this.personalDetails.dependentFamilyMemberCount = "";
      formData.append('dependentFamilyMemberCount', '');
    }
    else {
      formData.append('dependentFamilyMemberCount', this.personalDetails.dependentFamilyMemberCount);
    }


    if (this.personalDetails.gender === null || this.personalDetails.gender === undefined || this.personalDetails.gender === '') {
      this.personalDetails.gender = "";
      formData.append('gender', '');
    }
    else {
      formData.append('gender', this.personalDetails.gender);
    }

    if (this.personalDetails.workDetails === null || this.personalDetails.workDetails === undefined || this.personalDetails.workDetails === '') {
      this.personalDetails.workDetails = "";
      formData.append('workDetails', '');
    }
    else {
      formData.append('workDetails', this.personalDetails.workDetails);
    }

    if (this.personalDetails.artistSystemCode === null || this.personalDetails.artistSystemCode === undefined || this.personalDetails.artistSystemCode === '') {
      this.personalDetails.artistSystemCode = "";
      formData.append('artistSystemCode', '');
    }
    else {
      formData.append('artistSystemCode', this.personalDetails.artistSystemCode);
    }


    if (this.personalDetails.place === null || this.personalDetails.place === undefined || this.personalDetails.place === '') {
      this.personalDetails.place = "";
      formData.append('place', '');
    }
    else {
      formData.append('place', this.personalDetails.place);
    }




    formData.append('userId', this.personalDetails.userId.toString());

    if (this.personalDetails.artLocations === null || this.personalDetails.artLocations === undefined || this.personalDetails.artLocations === '') {
      this.personalDetails.artLocations = "";
      formData.append('artLocations', '');
    }
    else {
      formData.append('artLocations', this.personalDetails.artLocations);
    }

    if (this.personalDetails.currentAge === null || this.personalDetails.currentAge === undefined || this.personalDetails.currentAge === '') {
      this.personalDetails.currentAge = "";
      formData.append('currentAge', '');
    }
    else {
      formData.append('currentAge', this.personalDetails.currentAge);
    }

    if (this.personalDetails.firstName === undefined || this.personalDetails.firstName === null || this.personalDetails.firstName === "") {
      this.personalDetails.fullname = this.personalDetails.firstName;
    }
    else {
      this.personalDetails.fullname = this.personalDetails.firstName + " " + this.personalDetails.middleName + " " + this.personalDetails.lastName;
    }

    if (this.personalDetails.middleName === undefined || this.personalDetails.middleName === null || this.personalDetails.middleName === "") {
      this.personalDetails.fullname
    }
    else {
      this.personalDetails.fullname = this.personalDetails.firstName + " " + this.personalDetails.middleName + " " + this.personalDetails.lastName;
    }

    if (this.personalDetails.lastName === undefined || this.personalDetails.lastName === null || this.personalDetails.lastName === "") {
      this.personalDetails.fullname;
    }
    else {
      this.personalDetails.fullname = this.personalDetails.firstName + " " + this.personalDetails.middleName + " " + this.personalDetails.lastName;
    }

    if (this.personalDetails.reasonForEdit === null || this.personalDetails.reasonForEdit === undefined || this.personalDetails.reasonForEdit === '') {
      this.personalDetails.reasonForEdit = "";
      formData.append('reasonForEdit', '');
    }
    else {
      formData.append('reasonForEdit', this.personalDetails.reasonForEdit);
    }


    this.personalDetails.fullname = [...new Set(this.personalDetails.fullname.split(" "))].join(" ");
    formData.append('fullname', this.personalDetails.fullname);

    formData.append('createdBy', this.userId.toString());
    formData.append('applicationDate', this.personalDetails.applicationDate);

    if (this.personalDetails.financialBenefitReceived === null || this.personalDetails.financialBenefitReceived === undefined || this.personalDetails.financialBenefitReceived === '') {
      this.personalDetails.financialBenefitReceived = "";
      formData.append('financialBenefitReceived', '');
    }
    else {
      formData.append('financialBenefitReceived', this.personalDetails.financialBenefitReceived);
    }



    this.employeeService.saveProposalFormData(formData).subscribe(response => {
      this.submittedProposalFormId = Number(response);
      this.isFormSubmitted = true;
      this.toastr.success('Record Submitted Successfully');
      this.enableFileUploadingControls();
    });
  }
  disableFileUploadingControls() {
    this.savePersonalDetailsForm.controls.dobProof.disable();
    this.savePersonalDetailsForm.controls.maharashtraResidentProof.disable();
    this.savePersonalDetailsForm.controls.annualIncomeProof.disable();
    this.savePersonalDetailsForm.controls.beneficiaryBenefitPlanProof.disable();
    this.savePersonalDetailsForm.controls.artistPhotographProof.disable();
    this.savePersonalDetailsForm.controls.nomineePhotographProof.disable();
    this.savePersonalDetailsForm.controls.bankAccountConfirmationProof.disable();
    this.savePersonalDetailsForm.controls.publicationsGovtRecognistionProof.disable();
    this.savePersonalDetailsForm.controls.culturalMinsitryCertificationProof.disable();

    this.savePersonalDetailsForm.controls.sponseredDocumentsProof.disable();
    this.savePersonalDetailsForm.controls.collectorNominatedParticipationProof.disable();
    this.savePersonalDetailsForm.controls.institutionRecomendationProof.disable();


    this.savePersonalDetailsForm.controls.otherDocuments.disable();
    this.savePersonalDetailsForm.controls.manualFormProof.disable();

  }

  enableFileUploadingControls() {
    this.savePersonalDetailsForm.controls.dobProof.enable();
    this.savePersonalDetailsForm.controls.maharashtraResidentProof.enable();
    this.savePersonalDetailsForm.controls.annualIncomeProof.enable();
    this.savePersonalDetailsForm.controls.beneficiaryBenefitPlanProof.enable();
    this.savePersonalDetailsForm.controls.artistPhotographProof.enable();
    this.savePersonalDetailsForm.controls.nomineePhotographProof.enable();
    this.savePersonalDetailsForm.controls.bankAccountConfirmationProof.enable();
    this.savePersonalDetailsForm.controls.publicationsGovtRecognistionProof.enable();
    this.savePersonalDetailsForm.controls.culturalMinsitryCertificationProof.enable();

    this.savePersonalDetailsForm.controls.sponseredDocumentsProof.enable();
    this.savePersonalDetailsForm.controls.collectorNominatedParticipationProof.enable();
    this.savePersonalDetailsForm.controls.institutionRecomendationProof.enable();


    this.savePersonalDetailsForm.controls.otherDocuments.enable();
    this.savePersonalDetailsForm.controls.manualFormProof.enable();

  }
  assignValues() {
    console.log(this.personalDetailsData.FinancialBenefitReceived);
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
    this.personalDetails.financialBenefitReceived = this.personalDetailsData.FinancialBenefitReceived;
    this.isViewSelected = true;
  }
  valueChanged() {

    let date = new Date(this.personalDetails.dob);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")

    const day = `${date.getDate()}`.padStart(2, "0")

    const stringDate = [day, month, year].join("/");
    const ageCalcultaion = [year, month, day].join("-");
    this.personalDetails.currentAge = this.currentAgeCalculation(ageCalcultaion).toString();
    this.fullDate = stringDate;
    return this.fullDate
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
      //this.savePersonalDetailsForm.controls.financialBenefitReceived.enable();
      this.savePersonalDetailsForm.controls.notarisedCertificateOfConfirmationProof.enable();
    }
    else {
      this.isNotarisedCertificateOfConfirmationProof = true;
      //this.savePersonalDetailsForm.controls.financialBenefitReceived.disable();
      this.savePersonalDetailsForm.controls.notarisedCertificateOfConfirmationProof.disable();
    }
  }



  getDOBFileDetails(e) {

    for (var i = 0; i < e.target.files.length; i++) {
      this.dobFiles.push(e.target.files[i]);
    }

    if (this.dobFiles || this.dobFiles.length > 0) {
      this.isDateOfBirthProof = true;
      this.documentrTypeStr = 'dob_proof';
      this.insertDocuments(this.dobFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }

  getMahrashtraResidenceFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.maharashtraResidentFiles.push(e.target.files[i]);
    }

    if (this.maharashtraResidentFiles || this.maharashtraResidentFiles.length > 0) {
      this.isMaharashtraResidentProof = true;
      this.documentrTypeStr = 'resident_proof';
      this.insertDocuments(this.maharashtraResidentFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }


  getAnnualIncomeFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.annualIncomeFiles.push(e.target.files[i]);
    }

    if (this.annualIncomeFiles || this.annualIncomeFiles.length > 0) {
      this.isAnnualIncomeProof = true;
      this.documentrTypeStr = 'annual_income_photograph';
      this.insertDocuments(this.annualIncomeFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }


  getGovtBeneficiaryBenefitFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.govtBeneficiaryFiles.push(e.target.files[i]);
    }

    if (this.govtBeneficiaryFiles || this.govtBeneficiaryFiles.length > 0) {
      this.isGovermentBeneficiaryProof = true;
      this.documentrTypeStr = 'gov_beneficiray_proof';
      this.insertDocuments(this.govtBeneficiaryFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }

  getArtistPhotographFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.artistPhotographFiles.push(e.target.files[i]);
    }


    if (this.artistPhotographFiles || this.artistPhotographFiles.length > 0) {
      this.isArtistPhotographProof = true;
      this.documentrTypeStr = 'artist_photograph';
      this.insertDocuments(this.artistPhotographFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }

  getNomineePhotographFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.nomineePhotographFiles.push(e.target.files[i]);
    }
    if (this.nomineePhotographFiles || this.nomineePhotographFiles.length > 0) {
      this.isNomineePhotographProof = true;
      this.documentrTypeStr = 'nominee_photograph';
      this.insertDocuments(this.nomineePhotographFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }

  getBankAccountConfimationFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.bankAccountConfimationFiles.push(e.target.files[i]);
    }
    if (this.bankAccountConfimationFiles || this.bankAccountConfimationFiles.length > 0) {
      this.isBankAccountConfirmationProof = true;
      this.documentrTypeStr = 'bank_account_confirmation_proof';
      this.insertDocuments(this.bankAccountConfimationFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }

  getIllHandicapedFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.IllnessFiles.push(e.target.files[i]);
    }
    if (this.IllnessFiles || this.IllnessFiles.length > 0) {
      this.isIllnessHandicapedProof = true;
      this.documentrTypeStr = 'illness_handicaped_proof';
      this.insertDocuments(this.IllnessFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }

  getGovtRecognisitionFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.govtRecognistionFiles.push(e.target.files[i]);
    }
    if (this.govtRecognistionFiles || this.govtRecognistionFiles.length > 0) {
      this.isGovtRecognitionProof = true;
      this.documentrTypeStr = 'govt_recognition_proof';
      this.insertDocuments(this.govtRecognistionFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }


  getCulturalMinistryFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.culturalMinistryCertificationFiles.push(e.target.files[i]);
    }
    if (this.culturalMinistryCertificationFiles || this.culturalMinistryCertificationFiles.length > 0) {
      this.isCulturalMinistryCertificationProof = true;
      this.documentrTypeStr = 'cultural_ministry_proof';
      this.insertDocuments(this.culturalMinistryCertificationFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }

  getSponseredFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.sponseredProgramsFiles.push(e.target.files[i]);
    }
    if (this.sponseredProgramsFiles || this.sponseredProgramsFiles.length > 0) {
      this.isSponseredProgramsProof = true;
      this.documentrTypeStr = 'sponsered_programs_proof';
      this.insertDocuments(this.sponseredProgramsFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }

  getCollectorNominatedFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.collectorNominatedProgramParticipationFiles.push(e.target.files[i]);
    }
    if (this.collectorNominatedProgramParticipationFiles || this.collectorNominatedProgramParticipationFiles.length > 0) {
      this.documentrTypeStr = 'collector_nominated_proof';
      this.insertDocuments(this.collectorNominatedProgramParticipationFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }

  getIndividualInstitutionFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.individualRecomendationFiles.push(e.target.files[i]);
    }
    if (this.individualRecomendationFiles || this.individualRecomendationFiles.length > 0) {
      this.documentrTypeStr = 'institution_program_proof';
      this.insertDocuments(this.individualRecomendationFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }


  getNotarisedFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.notarisedCertificateFiles.push(e.target.files[i]);
    }
    if (this.notarisedCertificateFiles || this.notarisedCertificateFiles.length > 0) {
      this.documentrTypeStr = 'notarised_certificate_proof';
      this.insertDocuments(this.notarisedCertificateFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }

  getOtherDocumentsFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.otherDocumentsFiles.push(e.target.files[i]);
    }
    if (this.otherDocumentsFiles || this.otherDocumentsFiles.length > 0) {
      this.documentrTypeStr = 'other_documents_proof';
      this.insertDocuments(this.otherDocumentsFiles, this.documentrTypeStr);
    }
    else {
      return;
    }

  }

  getManualFileDetails(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.manualFormFiles.push(e.target.files[i]);
    }
    if (this.manualFormFiles || this.manualFormFiles.length > 0) {
      this.isManualFormProof = true;
      this.documentrTypeStr = 'manual_form_proof';
      this.insertDocuments(this.manualFormFiles, this.documentrTypeStr);
    }
    else {
      return;
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


  getDistrictMastersData(districtId) {
    this.employeeService.getDistrictById(districtId).subscribe(res => {
      this.districtMasterData = res;
      this.personalDetails.district = this.districtMasterData[0].DistrictId;

      let filteredString = this.districtMasterData[0].DistrictName.substring(0, 4);
      this.personalDetails.artistSystemCode = 'MH' + filteredString + '-' + this.artistSystemCode;
    });
  }

  selectedDistrictFromList(response) {
    let districtObj = response;
    let filteredString = districtObj.DistrictName.substring(0, 4);
    this.personalDetails.artistSystemCode = 'MH' + filteredString + '-' + this.artistSystemCode;
  }

  createFullName() {
    if (this.personalDetails.firstName && this.personalDetails.middleName && this.personalDetails.lastName) {
      this.personalDetails.fullname = this.personalDetails.firstName.concat(" ").concat(this.personalDetails.middleName).concat(" ").concat(this.personalDetails.lastName);
    }
    if (this.personalDetails.firstName) {
      if (this.personalDetails.fullname === undefined || this.personalDetails.fullname === null || this.personalDetails.fullname === "") {
        this.personalDetails.fullname = this.personalDetails.firstName;
      }
      else {
        this.personalDetails.fullname = this.personalDetails.fullname + "," + this.personalDetails.firstName;
      }

    }
    if (this.personalDetails.middleName) {

      if (this.personalDetails.fullname === undefined || this.personalDetails.fullname === null || this.personalDetails.fullname === "") {
        this.personalDetails.fullname = this.personalDetails.middleName;
      }
      else {
        this.personalDetails.fullname = this.personalDetails.fullname + "," + this.personalDetails.middleName;
        let x = Array.from(new Set(this.personalDetails.fullname.split(','))).toString();
        let filtredStr = x;
        var newStr = filtredStr.replace(/,/g, ' ');
        this.personalDetails.fullname = newStr;
      }

    }
    if (this.personalDetails.lastName) {
      if (this.personalDetails.fullname === undefined || this.personalDetails.fullname === null || this.personalDetails.fullname === "") {
        this.personalDetails.fullname = this.personalDetails.lastName;
      }
      else {
        this.personalDetails.fullname = this.personalDetails.fullname + "," + this.personalDetails.lastName;
        let x = Array.from(new Set(this.personalDetails.fullname.split(' '))).toString();
        let filtredStr = x;
        this.personalDetails.fullname = filtredStr;
        this.personalDetails.fullname = [...new Set(this.personalDetails.fullname.split(" "))].join(" ");
        this.personalDetails.fullname = [...new Set(this.personalDetails.fullname.split(","))].join(" ");
      }

    }

    if (this.personalDetails.firstName = '' && this.personalDetails.lastName === '' && this.personalDetails.middleName) {
      this.personalDetails.fullname = '';
    }
  }

  getStatusMaster() {
    this.employeeService.getStatusMasterData().subscribe(res => {
      this.statusMaster = res;
      this.submittedByPanchayat = this.statusMaster[4].StatusId;
      this.onHoldAtDistrict = this.statusMaster[7].StatusId;
      this.reqForEditForPanchayat = this.statusMaster[14].StatusId;
    });
  }

  insertDocuments(files: any[], fileType: string) {

    this.files = files;
    const insertDocumentsFormData = new FormData();


    for (var i = 0; i < this.files.length; i++) {
      insertDocumentsFormData.append("filePath", this.files[i]);
    }

    insertDocumentsFormData.append('docType', fileType);
    insertDocumentsFormData.append('proposalFormId', (this.submittedProposalFormId).toString());

    this.employeeService.postDocuments(insertDocumentsFormData).subscribe(res => {

      this.toastr.success('Successful');

    });

  }

  saveIsDraft() {
    const updateIsDraftFormData = new FormData();
    updateIsDraftFormData.append('proposalFormId', this.submittedProposalFormId.toString());
    updateIsDraftFormData.append('isDraft', 'NO');

    this.employeeService.postIsDraft(updateIsDraftFormData).subscribe(res => {
      this.toastr.success('Record Submitted Successfully !');
      this.emitterService.isPersonalDataCreated.emit(true);
      this.emitterService.isPanchyatArtistPuttedOnHold.emit(true);
      this.dialogRef.close();
    });
  }

}
