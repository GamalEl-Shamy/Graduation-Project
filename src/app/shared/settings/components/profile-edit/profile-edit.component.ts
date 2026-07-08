import { Component, inject, input, model, output, signal } from '@angular/core';
import { UpdateProfileRequest, UserProfile } from '../../models/settings.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SlideIn } from "../../../directives/slide-in";
import { CartService } from '../../../../modules/user/services/cart.service';
import { ToastComponent } from "../../../../modules/admin/shared/toast/toast.component";

@Component({
  selector: 'app-profile-edit',
  imports: [ReactiveFormsModule, SlideIn, ToastComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent {

  private fb = inject(FormBuilder);
  private cartService = inject(CartService);

  profile = input.required<UserProfile>();
  isSaving = input<boolean>(false);
  isShopping = model<boolean>(false);
  isShoppingComponent = model<boolean>(false);
  errorMessage = signal<string | null>(null);

  cancelRequest = output<void>();
  saveRequest = output<UpdateProfileRequest>();

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
  
  onEdit() {
    this.isShopping.set(false);
  }

  toPayment() {
    this.cartService.initiatePayment()
  }


  isProcessingPayment = signal<boolean>(false);

  onPayClicked() {
    this.isProcessingPayment.set(true);

    this.cartService.initiatePayment().subscribe({
      next: (response) => {
        if (response.url) {
          window.location.href = response.url;
        }
      },
      error: (err) => {
        this.isProcessingPayment.set(false);
        this.errorMessage.set(`Payment initiation failed: ${err}`)
        console.error('Payment initiation failed:', err);
      }
    });
  }
}
