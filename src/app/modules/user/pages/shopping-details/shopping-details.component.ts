import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  ɵInternalFormsSharedModule
} from '@angular/forms';
import { ProfileEditComponent } from "../../../../shared/settings/components/profile-edit/profile-edit.component";
import { SettingsService } from '../../../../shared/settings/services/settings.service';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { UpdateProfileRequest, UserProfile } from './../../../../shared/settings/models/settings.interface';
import { ToastComponent } from "../../components/shared/toast/toast.component";

@Component({
  selector: 'app-shopping-details',
  imports: [
    OrderSummaryComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    ProfileEditComponent,
    ToastComponent
],
  templateUrl: './shopping-details.component.html',
  styleUrl: './shopping-details.component.css',
})
export class ShoppingDetailsComponent {
  private profileService = inject(SettingsService);

  userProfile = signal<UserProfile | null>(null);
  isLoading = signal<boolean>(true);
  isEditingMode = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.userProfile.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load profile.');
        this.isLoading.set(false);
      }
    });
  }

  handleSave(updatedData: UpdateProfileRequest) {
    this.isSubmitting.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.profileService.updateProfile(updatedData).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.isEditingMode.set(false);
        this.successMessage.set('Profile updated successfully!');
        this.fetchProfile();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.message || 'Update failed.');
      }
    });
  }
}
