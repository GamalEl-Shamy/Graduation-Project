import { Component, inject, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { UserProfile } from '../../../models/user-profile.interface';
import { RouterLink } from "@angular/router";
import { ProfileDataSkeletonComponent } from "../../../skeletons/profile-data-skeleton/profile-data-skeleton.component";

@Component({
  selector: 'app-profile-section',
  imports: [RouterLink, ProfileDataSkeletonComponent],
  templateUrl: './profile-section.component.html',
  styleUrl: './profile-section.component.css',
})
export class ProfileSectionComponent {

  private profileService = inject(ProfileService);

  profile = signal<UserProfile | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.profileService.getProfile().subscribe({
      next: (data: UserProfile) => {
        this.profile.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load profile data. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

}
