import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/api/api.service';
import { LoginService } from 'src/app/login/login.service';
import { IUserVo } from 'src/app/model/IUserVo';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  passwordGroup: FormGroup;
  username = new FormControl({ value: '', disabled: true }, [
    Validators.required,
    Validators.minLength(6),
  ]);

  newRePassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  destroy$ = new Subject();
  constructor(
    private apiService: ApiService,
    private loginService: LoginService
  ) {
    this.passwordGroup = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  public ngOnInit() {
    this.apiService
      .getAccountDetails()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.username.setValue(user.username);
      });
  }

  updatePassword() {
    const data = this.passwordGroup.getRawValue();
    if (data.newPassword === this.newRePassword.value) {
      this.apiService
        .updatePassword(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (!!res) {
            sessionStorage.setItem('token', res.jwt.toString());
          }
        });
    } else {
      this.newRePassword.setErrors({ mismatch: true });
    }
  }
}
