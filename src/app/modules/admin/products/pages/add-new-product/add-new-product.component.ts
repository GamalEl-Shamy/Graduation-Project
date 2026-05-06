import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductRequest } from '../../models/create-product.interface';
import { ProductItem } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { CategoriesService } from '../../../categories/services/categories.service';
import { BrandsService } from '../../../brands/services/brands.service';
import { brandItems } from '../../../brands/models/brand.interface';
import { CategoryItem } from '../../../categories/models/category.interface';
import { ToastComponent } from "../../../shared/toast/toast.component";

@Component({
  selector: 'app-add-new-product',
  imports: [ReactiveFormsModule, ToastComponent],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css',
})
export class AddNewProductComponent implements OnInit {
  private productsService = inject(ProductService);
  private brandsService = inject(BrandsService);
  private categoriesService = inject(CategoriesService);

  productData = input<ProductItem | null>(null);
  brandsList = signal<brandItems[]>([]);
  categoriesList = signal<CategoryItem[]>([]);

  isClose = input(false);
  onClose = output<void>();
  onSuccess = output<void>();

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  imagePreview = signal<string | null>(null);

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl<string | null>(null),
    status: new FormControl(true),
    mainImg: new FormControl<File | string | null>(null), 
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    quantity: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl<number>(0, [Validators.min(0)]), 
    categoryId: new FormControl<number | null>(null, [Validators.required]),
    brandId: new FormControl<number | null>(null, [Validators.required]),
  });

  ngOnInit() {
    this.loadDropdownData();
    const data = this.productData();

    if (data) {
      this.productForm.patchValue({
        name: data.name,
        description: data.description,
        status: data.status,
        mainImg: data.mainImg, 
        price: data.price,
        quantity: data.quantity,
        discount: data.discount,
        categoryId: data.categoryId,
        brandId: data.brandId,
      });

      if (data.mainImg) {
        this.imagePreview.set(data.mainImg as string);
      }
    }
  }

  loadDropdownData() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => this.categoriesList.set(res.data),
      error: (err) => console.error('Error loading categories', err)
    });

    this.brandsService.getAllBrands().subscribe({
      next: (res) => this.brandsList.set(res.data),
      error: (err) => console.error('Error loading brands', err)
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // 1. نضيف الفايل في الفورم
      this.productForm.patchValue({ mainImg: file });
      this.productForm.get('mainImg')?.markAsTouched();

      // 2. نقرأ الفايل علشان نعرضه للمستخدم (Preview)
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const formValue = this.productForm.getRawValue();
    
    const requestData: ProductRequest = {
      name: formValue.name!,
      description: formValue.description,
      status: formValue.status!,
      mainImg: formValue.mainImg,
      price: Number(formValue.price),
      quantity: Number(formValue.quantity),
      discount: Number(formValue.discount || 0),
      categoryId: Number(formValue.categoryId),
      brandId: Number(formValue.brandId),
    };

    const currentProduct = this.productData();

    if (currentProduct) {
      this.productsService.updateProduct(currentProduct.productId, requestData).subscribe({
        next: (res) => {
          this.isSubmitting.set(false);
          this.successMessage.set('Product updated successfully.');
          setTimeout(() => {
            this.successMessage.set(null);
          }, 3000);
          this.onClose.emit();
          this.onSuccess.emit();
        },
        error: (err) => {
          console.error('Error updating product', err);
          console.log('Error updating product', err);
          this.errorMessage.set('Failed to update product. Please try again later.');
          this.isSubmitting.set(false);
        },
      });
    } else {
      this.productsService.createProduct(requestData).subscribe({
        next: (res) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(null);
          this.successMessage.set('Product created successfully.');
          this.clearInputs();
          setTimeout(() => {
            this.successMessage.set(null);
          }, 3000);
        },
        error: (err) => {
          console.error('Error creating product', err);
          this.errorMessage.set('Failed to create product. Please try again later.');
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
    return this.productForm.controls;
  }

  cancel() {
    this.clearInputs();
    this.onClose.emit();
  }

  clearInputs() {
    this.productForm.reset({
      name: '',
      description: null,
      status: true,
      mainImg: null,
      price: null,
      quantity: null,
      discount: 0,
      categoryId: null,
      brandId: null
    });
    this.imagePreview.set(null);
  }
}
