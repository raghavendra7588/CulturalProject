import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogAddUserMasterComponent } from '../dialog-add-user-master/dialog-add-user-master.component';
import { UpdateActiveStatusByState, UserMaster } from '../employees.model';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-dialog-role-management',
  templateUrl: './dialog-role-management.component.html',
  styleUrls: ['./dialog-role-management.component.css']
})
export class DialogRoleManagementComponent implements OnInit {


  updateActiveStatusByState: UpdateActiveStatusByState = new UpdateActiveStatusByState();

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
  isState: boolean = false;
  roleChanged: boolean = false;

  constructor(
    public emitterService: EmitterService,
    public formBuilder: FormBuilder,
    public employeeService: EmployeesService,
    private dialogRef: MatDialogRef<DialogAddUserMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private router: Router
  ) {
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
    console.log('user res', this.userResponse);
    this.userId = Number(sessionStorage.getItem('userId'));
    console.log(this.router.url);

    if (this.router.url === '/role/Panchayat') {
      this.isDistrictSelected = true;
    }

    if (this.router.url === '/role/State') {
      this.isState = true;
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

    if (this.userResponse) {
      this.assignValues();
    }
  }


  selectedIsActiveFromList(response) {
    console.log(this.userMaster.isActive);
  }



  getRoleMastersData(roleId) {
    let uniqueRoleMasterData: any = [];
    this.employeeService.getRoleMasterData(roleId).subscribe(res => {
      this.roleMasterData = res;
      uniqueRoleMasterData = _.uniqBy(this.roleMasterData, 'UserId');

    });
  }

  getDistrictMastersData() {
    this.employeeService.getDistrictMasterData().subscribe(res => {
      this.districtMasterData = res;
    });
  }



  assignValues() {
    if (this.userResponse) {
      console.log('user response', this.userResponse);
      this.userMaster.roleId = this.userResponse.RoleId;
      this.userMaster.name = this.userResponse.Name;
      this.userMaster.userName = this.userResponse.UserName;
      this.userMaster.mobileNumber = this.userResponse.MobileNumber;
      this.userMaster.emailId = this.userResponse.EmailId;
      this.userMaster.isActive = this.userResponse.IsActive;
      this.userMaster.PanchyatName = this.userResponse.PanchayatName;
      this.userMaster.districtId = this.userResponse.DistrictId;
      this.userMaster.pinCode = this.userResponse.PinCode;
    }
  }

  isRoleChange() {
    this.roleChanged = true;
  }


  addNewUser() {
    this.updateActiveStatusByState.IsActive = this.userMaster.isActive;
    this.updateActiveStatusByState.userId = this.userResponse.UserId;

    this.employeeService.postActiveStatus(this.updateActiveStatusByState).subscribe(res => {
      this.toastr.success('Status Updated');
      this.emitterService.isActiveStatusChanged.emit(true);
      this.dialogRef.close();
    });

    console.log('status change', this.updateActiveStatusByState);
  }
}
