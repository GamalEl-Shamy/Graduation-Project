import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileEditComponent } from "../../components/profile-edit/profile-edit.component";
import { ProfileInfoComponent } from "../../components/profile-info/profile-info.component";
import { UpdateProfileRequest, UserProfile } from '../../models/settings.interface';
import { SettingsService } from '../../services/settings.service';
import { SettingsSkeletonComponent } from "../../skeletons/settings-skeleton/settings-skeleton.component";

@Component({
  selector: 'app-settings',
  imports: [ProfileInfoComponent, ProfileEditComponent, SettingsSkeletonComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {

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
