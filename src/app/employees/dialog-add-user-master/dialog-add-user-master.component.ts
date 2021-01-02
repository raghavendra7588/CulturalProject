import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmitterService } from 'src/app/shared/emitter.service';
import { UserMaster } from '../employees.model';
import { EmployeesService } from '../employees.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-add-user-master',
  templateUrl: './dialog-add-user-master.component.html',
  styleUrls: ['./dialog-add-user-master.component.css']
})
export class DialogAddUserMasterComponent implements OnInit {

  saveUserMasterForm: FormGroup;
  userMaster: UserMaster = new UserMaster();
  hide = true;
  isActiveArray: any = [];
  roleMasterData: any = [];
  districtMasterData: any = [];
  roleId: number;
  userResponse: any;
  maxLengthPinCode = 6;
  maxLengthPhone = 10;
  role: string;
  userId: number;
  isDistrictSelected: boolean = false;
  currentUserStr: string = 'STATE';
  currentUser: string;
  savedUserMasterData: any = [];
  viewAction: string='';

  constructor(
    public emitterService: EmitterService,
    public formBuilder: FormBuilder,
    public employeeService: EmployeesService,
    private dialogRef: MatDialogRef<DialogAddUserMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private router: Router
  ) {
    sessionStorage.removeItem('language');
    sessionStorage.setItem('language', 'true');
    this.role = sessionStorage.getItem('role');


    this.saveUserMasterForm = this.formBuilder.group({
      name: [''],
      userName: [''],
      password: [''],
      mobileNumber: [''],
      emailId: [''],
      isActive: [''],
      roleId: [''],
      district: [''],
      PanchyatName: [''],
      pinCode: ['']
    });
    this.userResponse = data;
    this.userId = Number(sessionStorage.getItem('userId'));
    if (this.userResponse) {
      this.currentUserStr = this.userResponse.RoleName;
    }


    if (this.userResponse) {
      this.assignValues();
    }

    if ("viewAction" in sessionStorage) {
      this.viewAction = sessionStorage.getItem('viewAction');
    }
  }

  ngOnInit(): void {
    this.isActiveArray = [
      { id: 0, title: 'YES', flag: 'Y' },
      { id: 1, title: 'NO', flag: 'N' }
    ];
    this.roleId = parseInt(sessionStorage.getItem('RoleId'));
    this.getRoleMastersData(this.roleId);
    this.getDistrictMastersData();
  }


  selectedIsActiveFromList(response) {

  }

  selectedRoleFromList(response) {

    if (response.RoleName === 'DISTRICT') {
      this.isDistrictSelected = false;
      this.userMaster.PanchyatName = '';
      this.currentUserStr = response.RoleName;
    }
    if (response.RoleName === 'GRAMPANCHAYAT') {
      this.isDistrictSelected = true;
      this.currentUserStr = response.RoleName;
    }
    if (response.RoleName === 'STATE') {
      this.currentUserStr = response.RoleName;
    }

  }

  selectedDistrictFromList(response) {

  }

  getRoleMastersData(roleId) {
    let uniqueRoleMasterData: any = [];
    this.employeeService.getRoleMasterData(roleId).subscribe(res => {
      this.roleMasterData = res;
      uniqueRoleMasterData = _.uniqBy(this.roleMasterData, 'RoleId');
      this.roleMasterData = uniqueRoleMasterData;
    });
  }

  getDistrictMastersData() {
    this.employeeService.getDistrictMasterData().subscribe(res => {
      this.districtMasterData = res;
    });
  }

  addNewUser() {
    if (this.userResponse) {
      this.userMaster.userId = this.userResponse.UserId;

      if (this.role === 'ADMIN') {
        this.userMaster.updatedBy = this.userId;

      }
      if (this.role === 'STATE') {
        this.userMaster.updatedBy = this.userId;
      }
    }
    else {

      if (this.role === 'ADMIN') {
        this.userMaster.createdBy = this.userId;
        this.userMaster.updatedBy = 0;
      }
      if (this.role === 'STATE') {
        this.userMaster.createdBy = this.userId;
        this.userMaster.updatedBy = 0;
      }

    }

    this.employeeService.saveUserMasterData(this.userMaster).subscribe(res => {
      this.savedUserMasterData = res;

      if (this.savedUserMasterData === 0) {
        this.toastr.error('This User Name Exists.Use Another One');
        return;
      }
      else {
        this.emitterService.isUserMasterCreated.emit(true);
        this.toastr.success('Record Submitted');
        this.dialogRef.close();
      }

    });
  }

  assignValues() {
    if (this.userResponse) {
      this.userMaster.roleId = this.userResponse.RoleId;
      this.userMaster.name = this.userResponse.Name;
      this.userMaster.userName = this.userResponse.UserName;
      this.userMaster.mobileNumber = this.userResponse.MobileNumber;
      this.userMaster.emailId = this.userResponse.EmailId;
      this.userMaster.isActive = this.userResponse.IsActive;
      this.userMaster.PanchyatName = this.userResponse.PanchyatId;
      this.userMaster.districtId = this.userResponse.DistrictId;
      this.userMaster.pinCode = this.userResponse.PinCode;
    }
  }

  closeDiaglog() {
    sessionStorage.removeItem('viewAction');
    this.dialogRef.close();
  }
}
