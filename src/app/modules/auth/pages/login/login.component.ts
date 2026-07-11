import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, SlideIn],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.registerForm = this.fb.group({
      emailORUserName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = this.registerForm.value;

    this.authService.login(formData).subscribe({
      next: (res) => {
        if (res) {
          this.authService.refreshToken(res.accessToken, res.refreshToken).subscribe({
            next: (res) => {
              if (res) {
                
                this.authService.saveAccessToken(res.accessToken);
                this.authService.saveUserData();
                
                const role = this.authService.getUserData()?.role;

                if (typeof window != 'undefined') {
                  localStorage.setItem('welcomeState', 'true');
                }

                if (role === 'SuperAdmin' || role === 'Admin') {
                  this.router.navigate(['/admin']);
                } else if (role === 'Customer') {
                  this.router.navigate(['/users']);
                }
                this.isLoading = false;

                this.cdr.detectChanges();
              }
              this.cdr.detectChanges();
            },
          });
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;

        const errors = err?.error?.errors;
        let errorMessages = '';

        if (errors) {
          if (Array.isArray(errors)) {
            errorMessages = errors.map((e: any) => e.description).join(' ');
          } else if (typeof errors === 'object') {
            errorMessages = Object.values(errors).flat().join(' ');
          }
        }

        this.errorMessage =
          (typeof err?.error === 'string' ? err.error : null) ||
          err?.error?.message ||
          errorMessages ||
          err?.error?.title ||
          'Processing failed. Please try again.';

        this.cdr.detectChanges();
      },
    });
  }
}
