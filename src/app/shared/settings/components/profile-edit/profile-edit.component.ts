import { Component, inject, input, output } from '@angular/core';
import { UpdateProfileRequest, UserProfile } from '../../models/settings.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SlideIn } from "../../../directives/slide-in";

@Component({
  selector: 'app-profile-edit',
  imports: [ReactiveFormsModule, SlideIn],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent {

  profile = input.required<UserProfile>();
  isSaving = input<boolean>(false);

  cancelRequest = output<void>();
  saveRequest = output<UpdateProfileRequest>();

  private fb = inject(FormBuilder);
  profileForm!: FormGroup;

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: [this.profile().firstName, Validators.required],
      lastName: [this.profile().lastName, Validators.required],
      userName: [this.profile().userName, Validators.required],
      email: [this.profile().email, [Validators.required, Validators.email]],
      phoneNumber: [this.profile().phoneNumber, Validators.required],
      address: [this.profile().address],
      oldPassword: [null],
      newPassword: [null],
      confirmNewPassword: [null]
    });
  }

  onCancel() {
    this.cancelRequest.emit();
  }

  onSave() {
    if (this.profileForm.valid) {
      this.saveRequest.emit(this.profileForm.value);
    }
  }
}
