import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { ProfileService } from '../../services/profile.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastComponent } from '../../components/shared/toast/toast.component';

@Component({
  selector: 'app-shopping-details',
  imports: [
    OrderSummaryComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    RouterLink,
    ToastComponent,
  ],
  templateUrl: './shopping-details.component.html',
  styleUrl: './shopping-details.component.css',
})
export class ShoppingDetailsComponent {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  private cartService = inject(CartService);

  checkoutForm: FormGroup;
  isLoading = signal(false);
  updateMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  constructor() {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.isLoading.set(true);
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.checkoutForm.patchValue(profile);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  onContinueToPayment() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.profileService.updateProfile(this.checkoutForm.value).subscribe({
      next: () => {
        this.updateMessage.set('Information updated & proceeding to payment...');
        this.handleCheckout();
        setTimeout(() => {
          this.updateMessage.set(null);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage.set(err);
        this.isLoading.set(false);
        setTimeout(() => {
          this.errorMessage.set(null);
        }, 3000);
      },
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }

  handleCheckout() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.cartService.initiatePayment().subscribe({
      next: (res) => {
        if (res.url) {
          window.location.href = res.url;
          this.errorMessage.set(null);
        } else {
          this.errorMessage.set('Could not generate payment link.');
          this.isLoading.set(false);
          setTimeout(() => {
            this.errorMessage.set(null);
          }, 3000);
        }
      },
      error: (err) => {
        this.errorMessage.set('An error occurred while processing your payment.');
        this.isLoading.set(false);
        setTimeout(() => {
          this.errorMessage.set(null);
        }, 3000);
      },
    });
  }
}
