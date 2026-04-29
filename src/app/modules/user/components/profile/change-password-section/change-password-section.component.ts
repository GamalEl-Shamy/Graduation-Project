import { Component, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserProfile } from '../../../models/user-profile.interface';
import { ProfileService } from '../../../services/profile.service';
import { ProfileSkeletonComponent } from '../../../skeletons/profile-skeleton/profile-skeleton.component';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-change-password-section',
  imports: [ReactiveFormsModule, ToastComponent, RouterLink, ProfileSkeletonComponent],
  templateUrl: './change-password-section.component.html',
  styleUrl: './change-password-section.component.css',
})
export class ChangePasswordSectionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);

  isUpdating = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  isFetchingProfile = signal<boolean>(true);

  showOldPassword = signal<boolean>(false);
  showNewPassword = signal<boolean>(false);
  showConfirmNewPassword = signal<boolean>(false);

  updateForm: FormGroup = this.fb.group(
    {
      userName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)],
      ],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required, Validators.minLength(5)],
      address: ['', [Validators.required, Validators.minLength(5)]],
      oldPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          ),
        ],
      ],
      confirmNewPassword: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator },
  );

  ngOnInit() {
    this.isFetchingProfile.set(true);
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.profileService.getProfile().subscribe({
      next: (profileData) => {
        this.updateForm.patchValue({
          name: profileData.name,
          email: profileData.email,
          userName: profileData.userName,
          phoneNumber: profileData.phoneNumber,
          address: profileData.address,
        });

        this.isFetchingProfile.set(false);
      },
      error: (err) => {
        this.isFetchingProfile.set(false);
      },
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword')?.value;
    const confirmNewPassword = control.get('confirmNewPassword')?.value;

    if (newPassword && newPassword !== confirmNewPassword) {
      control.get('confirmNewPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    this.isUpdating.set(true);
    this.isLoading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const formData: UserProfile = this.updateForm.value;

    this.profileService.changePassword(formData).subscribe({
      next: (res) => {
        this.isUpdating.set(false);
        this.isLoading.set(false);
        this.successMessage.set('Password updated successfully!');
        this.updateForm.reset();
        setTimeout(() => this.successMessage.set(''), 3000);
      },
      error: (err) => {
        this.isUpdating.set(false);
        this.isLoading.set(false);
        this.errorMessage.set('Failed to change password. Please try again.');

        setTimeout(() => this.errorMessage.set(''), 3000);
      },
    });
  }

  get f() {
    return this.updateForm.controls;
  }

  toggleOldPassword() {
    this.showOldPassword.set(!this.showOldPassword());
  }

  toggleNewPassword() {
    this.showNewPassword.set(!this.showNewPassword());
  }

  toggleConfirmNewPassword() {
    this.showConfirmNewPassword.set(!this.showConfirmNewPassword());
  }

  //#region check New Password
  hasUpperCase() {
    const value = this.f['newPassword'].value || '';
    return /[A-Z]/.test(value);
  }

  hasLowerCase() {
    const value = this.f['newPassword'].value || '';
    return /[a-z]/.test(value);
  }

  hasNumber() {
    const value = this.f['newPassword'].value || '';
    return /[0-9]/.test(value);
  }

  hasSymbol() {
    const value = this.f['newPassword'].value || '';
    return /[^A-Za-z0-9]/.test(value);
  }
  //#endregion
}
