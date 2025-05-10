import { Component, HostBinding  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  @HostBinding('class') class = 'w-full md:w-auto';

  form: FormGroup;
  submitted: boolean = false;

  showPassword: boolean = false;
  showPasswordValidate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.passwordStrengthValidator]],
      passwordValidate: ['', [Validators.required, this.passwordMatchValidator]]
    })
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

  // Validate password match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control?.parent?.get('password')?.value;
    const confirmPassword = control?.value;
  
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
  
    return null;
  }

  // Convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  togglePasswordVisibility(validate: boolean): void {
    if(!validate) this.showPassword = !this.showPassword;
    if(validate) this.showPasswordValidate = !this.showPasswordValidate;
  }

  onSubmit() {
    if(this.form.invalid) return;

    this.submitted = true;

    const { email, password } = this.form.value;

    this.authService.register(email, password).subscribe(
      (response) => {
        this.submitted = false;
        this.authService.setToken(response.data.jwt);
        this.router.navigate(['/movies']);
      },
      (error) => {
        this.submitted = false;
        this.toastr.error(error);
      }
    );
  }
}