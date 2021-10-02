import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/api/api.service';
import { HeaderService } from 'src/app/core/header.service';

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
    private headerService: HeaderService,
    private route: ActivatedRoute
  ) {
    this.headerService.setHeader(this.route.snapshot.data.title);
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
