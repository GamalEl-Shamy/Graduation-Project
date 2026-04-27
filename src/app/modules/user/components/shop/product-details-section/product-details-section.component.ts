import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDetails } from '../../../models/product-details.interface';
import { CartService } from '../../../services/cart.service';
import { ProductsService } from '../../../services/products.service';
import { ProductDetailsSkeletonComponent } from '../../../skeletons/product-details-skeleton/product-details-skeleton.component';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-product-details-section',
  imports: [ToastComponent, ProductDetailsSkeletonComponent, RouterLink],
  templateUrl: './product-details-section.component.html',
  styleUrl: './product-details-section.component.css',
})
export class ProductDetailsSectionComponent implements OnInit {
  id!: number;
  productCount = signal<number>(1);

  private readonly activatedRoute = inject(ActivatedRoute);
  private CartService = inject(CartService);

  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);

  addProductLoading = signal<boolean>(false);
  addProductSuccessMessage = signal<string>('');
  addProductErrorMessage = signal<string>('');
  addProductId = signal<number>(0);

  product = signal<ProductDetails | null>(null);
  isLoading = signal(true);
  imgBaseUrl = 'https://zaraaapi.runasp.net/Images/';

  ngOnInit(): void {
    this.getId();
  }

  getId() {
    this.activatedRoute.paramMap.subscribe({
      next: (value) => {
        this.id = Number(value.get('id'));

        if (this.id) {
          this.getProductDetails();
        }
      },
    });
  }

  getProductDetails() {
    this.productService.getProductDetails(this.id).subscribe({
      next: (data) => {
        this.product.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  addToCart(product: ProductDetails, count: number = this.productCount()) {
    this.addProductLoading.set(true);
    this.addProductId.set(product.product.productId);
    if (product.product.quantity >= count) {
      this.CartService.addToCart(product.product.productId, count).subscribe({
        next: (res) => {
          this.addProductLoading.set(false);
          this.addProductId.set(0);
          this.productCount.set(1);
          this.addProductSuccessMessage.set('Add Product to cart Successfully');
          this.showToast();
        },
        error: (err) => {
          this.addProductLoading.set(false);
          this.addProductId.set(0);
          const error = err?.title;
          this.addProductErrorMessage.set(error || ' Operation failed. Please try again.');
          this.showToast();
        },
      });
    } else if (product.product.quantity < count) {
      this.addProductLoading.set(false);
      this.addProductId.set(0);
      this.addProductErrorMessage.set('Please enter a valid quantity.');
      this.showToast();
    }
  }

  increaseProductCount() {
    if (
      this.product()?.product.quantity &&
      this.productCount() < this.product()?.product.quantity!
    ) {
      this.productCount.update((count) => count + 1);
    } else {
      this.addProductErrorMessage.set('You cannot add more than the available quantity.');
      this.showToast();
    }
  }

  decreaseProductCount() {
    if (this.productCount() > 1) {
      this.productCount.update((count) => count - 1);
    } else {
      this.addProductErrorMessage.set('Please enter a valid quantity.');
      this.showToast();
    }
  }

  getOriginalPrice(newPrice: number, disc: number): number {
    if (!disc || disc <= 0) return newPrice;

    return newPrice / (1 - disc / 100);
  }

  showToast() {
    setTimeout(() => {
      this.onToastClose();
    }, 3000);
  }

  onToastClose() {
    this.addProductSuccessMessage.set('');
    this.addProductErrorMessage.set('');
  }
}
