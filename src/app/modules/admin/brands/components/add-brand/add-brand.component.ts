import { Component, inject, output, signal, Input, input, OnInit } from '@angular/core';
import { CreateBrandRequest } from '../../models/create-brand-request.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrandsService } from '../../services/brands.service';
import { brandItems } from '../../models/brand.interface';
import { ToastComponent } from '../../../shared/toast/toast.component';

@Component({
  selector: 'app-add-brand',
  imports: [ReactiveFormsModule, ToastComponent],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css',
})
export class AddBrandComponent implements OnInit {
  private brandsService = inject(BrandsService);

  brandData = input<brandItems | null>(null);
  isClose = input(false);
  onClose = output<void>();
  onSuccess = output<void>();

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  brandForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl<string | null>(null),
    status: new FormControl(true),
  });

  ngOnInit() {
    const data = this.brandData();

    if (data) {
      this.brandForm.patchValue({
        name: data.name,
        description: data.description,
        status: data.status,
      });
    }
  }

  onSubmit() {
    if (this.brandForm.invalid) {
      this.brandForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const formValue = this.brandForm.getRawValue();
    const requestData: CreateBrandRequest = {
      name: formValue.name!,
      description: formValue.description,
      status: formValue.status!,
    };

    const currentBrand = this.brandData();

    if (currentBrand) {
      this.brandsService.updateBrand(currentBrand.id, requestData).subscribe({
        next: (res) => {
          this.isSubmitting.set(false);
          this.successMessage.set('Brand updated successfully.');
          setTimeout(() => {
            this.successMessage.set(null);
          }, 3000);
          this.onClose.emit();
          this.onSuccess.emit();
        },
        error: (err) => {
          console.error('Error updating brand', err);
          this.errorMessage.set('Failed to update brand. Please try again later.');
          this.isSubmitting.set(false);
        },
      });
    } else {
      this.brandsService.createBrand(requestData).subscribe({
        next: (res) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(null);
          this.successMessage.set('Brand created successfully.');
          this.clearInputs();
          setTimeout(() => {
            this.successMessage.set(null);
          }, 3000);
        },
        error: (err) => {
          console.error('Error creating brand', err);
          this.errorMessage.set('Failed to create brand. Please try again later.');
          console.log('Error details:', err);
          this.isSubmitting.set(false);
          setTimeout(() => {
            this.errorMessage.set(null);
          }, 3000);
        },
      });
    }
  }

  get f() {
    return this.brandForm.controls;
  }

  cancel() {
    this.clearInputs();
    this.onClose.emit();
  }

  clearInputs() {
    this.brandForm.reset({
      name: '',
      description: null,
      status: true, 
    });
  }
}
