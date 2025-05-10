import { Component, HostBinding } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @HostBinding('class') class = 'w-full md:w-auto';

  form: FormGroup;

  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          this.passwordStrengthValidator,
        ],
      ],
    });
  }

  // Validate password
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[\W_]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
    return !valid ? { weakPassword: true } : null;
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.authService.logIn(email, password).subscribe(
      (response) => {
        this.authService.setToken(response.data.jwt);
        this.router.navigate(['/movies']);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
