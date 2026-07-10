import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule, SlideIn],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  resetForm = this.fb.nonNullable.group({
    userName: ['', Validators.required],
    code: ['', Validators.required]
  });

  // ngOnInit() {
  //   const historyState = history.state;
  //   if (historyState && historyState.userName) {
  //     this.resetForm.patchValue({ userName: historyState.userName });
  //   }
  // }

  onSubmit() {
    if (this.resetForm.invalid) return;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const data = this.resetForm.getRawValue();

    this.authService.resetPassword(data).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/auth/change-password'], { state: { userName: data.userName } });
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error || 'Invalid OTP code.');
      }
    });
  }
}
