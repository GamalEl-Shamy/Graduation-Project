import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, SlideIn],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  forgotForm = this.fb.nonNullable.group({
    emailORUserName: ['', Validators.required]
  });

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const data = this.forgotForm.getRawValue();

    this.authService.forgetPassword(data).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/auth/reset-password'], { state: { userName: data.emailORUserName } });
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error || 'User not found. Please try again.');
      }
    });
  }
}
