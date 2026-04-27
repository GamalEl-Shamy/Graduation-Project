import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import {
  AllProductResponse,
  CategoriesList,
  Pagination,
  Product,
} from '../../../models/product.interface';
import { CartService } from '../../../services/cart.service';
import { ProductsService } from '../../../services/products.service';
import { ShopSkeletonsComponent } from '../../../skeletons/shop-skeletons/shop-skeletons.component';
import { ShopHeaderComponent } from '../shop-header/shop-header.component';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-shop-section',
  imports: [ShopHeaderComponent, ShopSkeletonsComponent, RouterLink, ToastComponent],
  templateUrl: './shop-section.component.html',
  styleUrl: './shop-section.component.css',
})
export class ShopSectionComponent implements OnInit {
  private productsService = inject(ProductsService);
  private CartService = inject(CartService);

  readonly imgUrl = environment.apiUrl + '/Images/';

  products = signal<Product[]>([]);
  categoriesList = signal<CategoriesList[]>([]);
  pagination = signal<Pagination | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  addProductLoading = signal<boolean>(false);
  addProductSuccessMessage = signal<string>('');
  addProductErrorMessage = signal<string>('');
  addProductId = signal<number>(0);

  currentFilters = signal<any>({ page: 1 });

  pagesArray = computed(() => {
    const total = 10;
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.productsService.getHomeData(this.currentFilters()).subscribe({
      next: (response: AllProductResponse) => {
        this.products.set(response.returned.products);
        this.pagination.set(response.pagination);
        this.categoriesList.set(response.categoriesList);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load products. Please try again later.');
        this.isLoading.set(false);
      },
    });
  }

  goToPage(newPage: number) {
    const maxPages = 10;

    if (newPage >= 1 && newPage <= maxPages) {
      this.currentFilters.update((filters) => ({ ...filters, page: newPage }));
      this.loadProducts();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  searchByProductName(name: string) {
    this.currentFilters.update((filters) => ({
      ...filters,
      productName: name,
      page: 1,
    }));
    this.loadProducts();
  }

  updateMinPrice(min: string) {
    const value = min === '' ? undefined : Number(min);
    this.currentFilters.update((f) => ({ ...f, minPrice: value, page: 1 }));
    this.loadProducts();
  }

  updateMaxPrice(max: string) {
    const value = max === '' ? undefined : Number(max);
    this.currentFilters.update((f) => ({ ...f, maxPrice: value, page: 1 }));
    this.loadProducts();
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    const categoryId = value === '' ? null : Number(value);

    this.filterByCategory(categoryId);
  }

  filterByCategory(categoryId: number | null) {
    this.currentFilters.update((filters) => {
      const newFilters = { ...filters, page: 1 };

      if (categoryId === null) {
        delete newFilters.categoryId;
      } else {
        newFilters.categoryId = categoryId;
      }

      return newFilters;
    });

    this.loadProducts();
  }

  toggleHotProducts(isHot: boolean) {
    this.currentFilters.update((filters) => ({
      ...filters,
      isHot: isHot,
      page: 1,
    }));
    this.loadProducts();
  }

  clearAllFilters() {
    this.currentFilters.set({ page: 1 });
    this.loadProducts();
  }

  getOriginalPrice(newPrice: number, disc: number): number {
    if (!disc || disc <= 0) return newPrice;

    return newPrice / (1 - disc / 100);
  }

  addToCart(product: Product, count: number = 1) {
    this.addProductLoading.set(true);
    this.addProductId.set(product.productId);
    if (product.quantity >= count) {
      this.CartService.addToCart(product.productId, count).subscribe({
        next: (res) => {
          this.addProductLoading.set(false);
          this.addProductId.set(0);
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
    } else if (product.quantity < count) {
      this.addProductLoading.set(false);
      this.addProductId.set(0);
      this.addProductErrorMessage.set('Please enter a valid quantity.');
      this.showToast();
    }
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
