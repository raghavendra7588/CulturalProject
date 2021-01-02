import { Component, OnInit } from '@angular/core';
import { ChangePassword } from '../user.model';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassword: ChangePassword = new ChangePassword();
  hide = true;
  hideNewPswrd = true;
  hideConfirmPswrd = true;
  userId: number;

  constructor(
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public userService: UserService,
    public router: Router
  ) {
    this.userId = Number(sessionStorage.getItem('userId'));
  }

  ngOnInit(): void {
  }

  changeCurrentPassword() {
    this.changePassword.userId = this.userId;

    if (this.changePassword.confirmPassword !== this.changePassword.newPassword) {
      this.toastr.error('New And Confirm Password Do Not Matched');
      return;
    }
    else {
      this.userService.changePassword(this.changePassword).subscribe(res => {
        if (res === 0) {
          this.toastr.error('Password Not Matched !!');
          return;
        }
        else {
          this.toastr.success('Password Changed Successfully !!');
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

}
