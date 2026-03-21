import { ChangeDetectorRef, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterSuccessComponent } from "../../components/register-success/register-success.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, RegisterSuccessComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  firstNameValue: string = '';
  lastNameValue: string = '';
  userNameValue: string = '';
  generateState: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        userName: [
          '',
          [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        address: [null],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  //#region Generate userName
  private readonly randomWords = [
    'star',
    'wolf',
    'hawk',
    'byte',
    'nova',
    'blaze',
    'neo',
    'shadow',
    'storm',
    'flash',
    'pixel',
    'echo',
    'frost',
    'drift',
    'apex',
    'user',
  ];

  private generateRandomWord(): string {
    const words = this.randomWords.filter((w) => w.length >= 4);
    return words[Math.floor(Math.random() * words.length)];
  }

  generateUserName(): void {
    this.generateState = true;
    this.firstNameValue = this.f['firstName'].value;
    this.lastNameValue = this.f['lastName'].value;
    this.userNameValue = this.firstNameValue + this.lastNameValue;

    const userNameControl = this.registerForm.get('userName');
    if (!userNameControl?.value) {
      let username = this.userNameValue?.toLowerCase().replace(/\s+/g, '');

      if (username.length === 0) {
        username = this.generateRandomWord();
      } else if (username.length < 3) {
        const randomWord = this.randomWords[Math.floor(Math.random() * this.randomWords.length)];
        username = username + '_' + randomWord;
      }
      username += +Math.floor(1000 + Math.random() * 9000).toString();
      this.registerForm.patchValue({ userName: username });
    }
  }
  //#endregion

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  get f() {
    return this.registerForm.controls;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  //#region check Password
  hasUpperCase() {
    const value = this.f['password'].value || '';
    return /[A-Z]/.test(value);
  }

  hasLowerCase() {
    const value = this.f['password'].value || '';
    return /[a-z]/.test(value);
  }

  hasNumber() {
    const value = this.f['password'].value || '';
    return /[0-9]/.test(value);
  }

  hasSymbol() {
    const value = this.f['password'].value || '';
    return /[^A-Za-z0-9]/.test(value);
  }
  //#endregion

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.registerForm.value;

    this.authService.register(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Account created! Please check your email to confirm your account.';
        this.cdr.detectChanges();
        console.log('1')
        console.log(this.isLoading);
        console.log(this.successMessage)
        console.log('2')
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 10000);
      },
      error: (err) => {
        this.isLoading = false;

        const errors = err?.error?.errors;
        let errorMessages = '';

        if (errors) {
          if (Array.isArray(errors)) {
            // Identity errors: [{description: '...'}]
            errorMessages = errors.map((e: any) => e.description).join(' ');
          } else if (typeof errors === 'object') {
            // Validation errors: { LastName: ['...'], Email: ['...'] }
            errorMessages = Object.values(errors).flat().join(' ');
          }
        }

        var extractedError:string = Object.values(err?.error || {}).flat().join(' ');

        if(extractedError){
          extractedError = "This username is already taken.Try another"
        }

        this.errorMessage =
          err?.error?.message ||
          errorMessages ||
          err?.error?.title ||
          extractedError ||
          'Registration failed. Please try again.';

        this.cdr.detectChanges();
      },
    });
  }
}


