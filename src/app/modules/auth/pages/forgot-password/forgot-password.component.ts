import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
// step: 'email' | 'otp' | 'success' = 'email';
//   isLoading = false;
//   emailForm: FormGroup;
//   otpForm: FormGroup;
//   maskedEmail = '';
//   resendTimer = 60;
//   private timerInterval: any;

//   constructor(private fb: FormBuilder) {
//     this.emailForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]]
//     });

//     this.otpForm = this.fb.group({
//       otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
//     });
//   }

//   get email() { return this.emailForm.get('email'); }
//   get otp() { return this.otpForm.get('otp'); }

//   onSubmitEmail(): void {
//     if (this.emailForm.invalid) return;
    
//     this.isLoading = true;
//     const email = this.emailForm.value.email;
    
//     // Simulate API call
//     setTimeout(() => {
//       this.maskedEmail = this.maskEmail(email);
//       this.step = 'otp';
//       this.isLoading = false;
//       this.startResendTimer();
//     }, 1500);
//   }

//   onSubmitOtp(): void {
//     if (this.otpForm.invalid) return;
    
//     this.isLoading = true;
    
//     // Simulate OTP verification
//     setTimeout(() => {
//       this.isLoading = false;
//       this.step = 'success';
//       clearInterval(this.timerInterval);
//     }, 1500);
//   }

//   resendOtp(): void {
//     if (this.resendTimer > 0) return;
    
//     this.isLoading = true;
    
//     setTimeout(() => {
//       this.isLoading = false;
//       this.startResendTimer();
//     }, 1000);
//   }

//   private startResendTimer(): void {
//     this.resendTimer = 60;
//     clearInterval(this.timerInterval);
//     this.timerInterval = setInterval(() => {
//       this.resendTimer--;
//       if (this.resendTimer <= 0) clearInterval(this.timerInterval);
//     }, 1000);
//   }

//   private maskEmail(email: string): string {
//     const [user, domain] = email.split('@');
//     const maskedUser = user.charAt(0) + '***' + user.charAt(user.length - 1);
//     return `${maskedUser}@${domain}`;
//   }
}
