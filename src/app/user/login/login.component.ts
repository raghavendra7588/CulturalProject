import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicuserService } from '../basicuser.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  role: string;
  loginResponse: any = [];
  roleId: number;
  roleName: string;
  userName: string;
  userId: string;
  districtId: number;
  panchyatName: string;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public basicUserService: BasicuserService,
    public userService: UserService,
    private toastr: ToastrService,
    public emitterService: EmitterService
  ) { }

  loginForm = this.fb.group({
    username: [null],
    password: [null]
  });

  ngOnInit(): void {
    this.role = 'ADMIN';
  }


  login() {


    this.userService.verifyLogin(this.user).subscribe(res => {
      this.loginResponse = res;

    


      if (this.loginResponse && this.loginResponse[0].Column1 != 'Incorrect Login Credentials') {
        this.userName = this.loginResponse[0].Name;
        this.roleName = this.loginResponse[0].RoleName;
        this.roleId = this.loginResponse[0].RoleId;
        this.userId = this.loginResponse[0].UserId;
        this.districtId = this.loginResponse[0].DistrictId;
        if (this.loginResponse[0].PanchyatId) {
          sessionStorage.setItem('panchayatName', this.loginResponse[0].PanchyatId);
        }

        this.toastr.success('Login Successful');
        this.basicUserService.setLocalCache(this.roleName, this.roleId, this.districtId);
        sessionStorage.setItem('language', 'true');
        sessionStorage.setItem('Name', this.userName);
        sessionStorage.setItem('userId', this.userId.toString());
        this.emitterService.isLoggedIn.emit(true);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.toastr.error('Login Failed Or User InActive');
      }
    });

  }


}
