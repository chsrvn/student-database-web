import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS } from '../constants/constants';
import { ToasterService } from '../core/toaster.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  profileForm: FormGroup;

  isLogin = true;

  repassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toasterService: ToasterService
  ) {
    this.profileForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  onLogin() {
    const data = this.profileForm.getRawValue();
    if (!this.isLogin) {
      this.isLogin = !this.isLogin;
    } else {
      this.loginService.loginUser(data);
    }
  }

  registerUser() {
    if (!!this.isLogin) {
      this.isLogin = !this.isLogin;
    } else {
      const data = this.profileForm.getRawValue();
      if (data.password === this.repassword.value) {
        this.loginService.registerUser(data).subscribe(
          (res: any) => {
            if (!!res) {
              this.router.navigate(['login']);
            }
          },
          (error) => {
            if (error.status === 409) {
              this.toasterService.presentToast(error?.error?.message);
            } else {
              this.toasterService.presentToast(CONSTANTS.DEFAULT_ERROR_MSG);
            }
          }
        );
      } else {
        this.repassword.setErrors({ mismatch: true });
      }
    }
  }
}
