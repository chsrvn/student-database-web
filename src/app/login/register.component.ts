import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private loginService: LoginService) {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        repassword: new FormControl('', Validators.required),
      },
      {
        validators: (formGroup) =>
          formGroup?.get('password')?.value ===
          formGroup.get('repassword')?.value
            ? null
            : { mismatch: true },
      }
    );
  }

  registerUser() {
    const data = this.registerForm.getRawValue();
    this.loginService.registerUser(data);
  }
}
