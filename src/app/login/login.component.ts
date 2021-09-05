import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  profileForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {
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
  onSubmit() {
    const data = this.profileForm.getRawValue();
    // this.loginService.loginUser(data);
  }

  registerUser() {
    console.log(this.profileForm);
    // const data = this.profileForm.getRawValue();
    // this.loginService.registerUser(data);
    // this.router.navigate(["register"]);
  }
}
