import { Component, inject, input, output, signal } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CategoryItem } from '../../models/category.interface';
import { CategoryRequest } from '../../models/create-category.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastComponent } from "../../../shared/toast/toast.component";
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule, ToastComponent, SlideIn],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
private categoriesService = inject(CategoriesService);

  categoryData = input<CategoryItem | null>(null);
  
  isClose = input(false);
  onClose = output<void>();
  onSuccess = output<void>();

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl<string | null>(null),
    status: new FormControl(true),
  });

  ngOnInit() {
    const data = this.categoryData();

    if (data) {
      this.categoryForm.patchValue({
        name: data.name,
        description: data.description,
        status: data.status,
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const formValue = this.categoryForm.getRawValue();
    const requestData: CategoryRequest = {
      name: formValue.name!,
      description: formValue.description,
      status: formValue.status!,
    };

    const currentCategory = this.categoryData();

    if (currentCategory) {
      this.categoriesService.updateCategory(currentCategory.id, requestData).subscribe({
        next: (res) => {
          this.isSubmitting.set(false);
          this.successMessage.set('Category updated successfully.');
          setTimeout(() => {
            this.successMessage.set(null);
          }, 3000);
          this.onClose.emit();
          this.onSuccess.emit();
        },
        error: (err) => {
          console.error('Error updating category', err);
          this.errorMessage.set('Failed to update category. Please try again later.');
          this.isSubmitting.set(false);
        },
      });
    } else {
      this.categoriesService.createCategory(requestData).subscribe({
        next: (res) => {
          this.onSuccess.emit();
          this.isSubmitting.set(false);
          this.errorMessage.set(null);
          this.successMessage.set('Category created successfully.');
          this.clearInputs();
          setTimeout(() => {
            this.successMessage.set(null);
          }, 3000);
        },
        error: (err) => {
          console.error('Error creating category', err);
          this.errorMessage.set('Failed to create category. Please try again later.');
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
    return this.categoryForm.controls;
  }

  cancel() {
    this.clearInputs();
    this.onClose.emit();
  }

  clearInputs() {
    this.categoryForm.reset({
      name: '',
      description: null,
      status: true, 
    });
  }
}
