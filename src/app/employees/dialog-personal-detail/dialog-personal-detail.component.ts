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
  districtId: number;
  isViewSelected: boolean;

  statusMaster: any = [];
  submittedByPanchayat: number;
  onHoldAtDistrict: number;

  isExisitingEdit: boolean = false;
  reqForEditForPanchayat: number;

  constructor(
    public formBuilder: FormBuilder,
    public employeeService: EmployeesService,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogPersonalDetailComponent>,
    public emitterService: EmitterService,
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
      reasonForEdit: ['']
    });
    this.districtId = Number(sessionStorage.getItem('DistrictId'));
    this.personalDetailsData = data;
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

    this.savePersonalDetailsForm.controls.financialBenefitReceived.disable();
    this.savePersonalDetailsForm.controls.illHandicapedProof.disable();
    this.savePersonalDetailsForm.controls.notarisedCertificateOfConfirmationProof.disable();
    this.userId = Number(sessionStorage.getItem('userId'));
    this.personalDetails.userId = this.userId;
    this.getStatusMaster();
    this.personalDetails.applicationDate = new Date();
    this.personalDetails.place = sessionStorage.getItem('panchayatName');
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
      let fullDate;
      fullDate = this.valueChanged();
      this.personalDetails.dob = fullDate.toString();
      formData.append('dob', this.personalDetails.dob);
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


    if (this.personalDetails.applicationDate === null || this.personalDetails.applicationDate === undefined || this.personalDetails.applicationDate === '') {
      this.personalDetails.applicationDate = "";
      formData.append('applicationDate', '');
    }
    else {
      let fullDate;
      fullDate = this.applicationvalueChanged();
      this.personalDetails.applicationDate = fullDate.toString();
      formData.append('applicationDate', this.personalDetails.applicationDate);

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

    this.employeeService.saveProposalFormData(formData).subscribe(response => {
      this.emitterService.isPersonalDataCreated.emit(true);
      this.emitterService.isPanchyatArtistPuttedOnHold.emit(true);
      this.toastr.success('Record Submitted Successfully');
      this.dialogRef.close();
    });
  }

  assignValues() {
    this.personalDetails.artistSystemCode = this.personalDetailsData.ArtistSystemCode;
    this.personalDetails.firstName = this.personalDetailsData.FirstName;
    this.personalDetails.middleName = this.personalDetailsData.MiddleName;
    this.personalDetails.lastName = this.personalDetailsData.LastName;
    this.personalDetails.dob = new Date(this.personalDetailsData.DOB);
    this.personalDetails.applicationDate = new Date(this.personalDetailsData.ApplicationDate);
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
    this.personalDetails.applicationDate = new Date(this.personalDetailsData.ApplicationDate);
    this.personalDetails.fullname = this.personalDetailsData.FullName;
    this.personalDetails.gender = this.personalDetailsData.Gender;
    this.personalDetails.pinCode = this.personalDetailsData.PinCode;
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
    let fullDate = stringDate;
    return fullDate
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


  applicationvalueChangedData() {

    let date = new Date();
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")

    const day = `${date.getDate()}`.padStart(2, "0")

    const stringDate = [day, month, year].join("/");
    let fullDate = stringDate;
    this.personalDetails.applicationDate = fullDate

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



}
