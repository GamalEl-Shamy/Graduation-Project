import { Component, inject, signal } from '@angular/core';
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { ToastComponent } from "../../../shared/toast/toast.component";
import { ProductItem, ProductResponse } from '../../models/product.interface';
import { AddNewProductComponent } from "../../pages/add-new-product/add-new-product.component";
import { ProductService } from '../../services/product.service';
import { environment } from '../../../../../../environments/environment.development';
import { SkeletonAdminComponent } from "../../../shared/skeleton-admin/skeleton-admin.component";
import { EmptyProductComponent } from "../empty-product/empty-product.component";

@Component({
  selector: 'app-all-products',
  imports: [AddNewProductComponent, ToastComponent, LoadingComponent, SkeletonAdminComponent, EmptyProductComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  isAddProduct = signal(false);

  private productsService = inject(ProductService);
  readonly imgUrl = environment.apiUrl + '/Images/';

  products = signal<ProductResponse | null>(null);
  productsList = signal<ProductItem[]>([]);

  isLoading = signal<boolean>(true);
  isDeleted = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successDeletedMessage = signal<string | null>(null);

  selectedProduct = signal<ProductItem | null>(null);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products.set(response);
        this.productsList.set(response.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage.set('Failed to load products. Please try again later.');
        this.isLoading.set(false);
      },
    });
  }

  deleteProduct(id: number) {
    const isConfirmed = confirm('Are you sure you want to delete this product?');

    if (isConfirmed) {
      this.isDeleted.set(true);
      this.productsService.deleteProduct(id).subscribe({
        next: (response) => {
          this.successDeletedMessage.set('Product deleted successfully.');
          this.isDeleted.set(false);
          setTimeout(() => {
            this.successDeletedMessage.set(null);
          }, 3000);
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.isDeleted.set(false);
          alert('Failed to delete product. Please try again later.');
        },
      });
    }
  }

  openEditModal(product: ProductItem) {
    this.selectedProduct.set(product);
    this.isAddProduct.set(true);
  }

  toggleAddProduct() {
    this.isAddProduct.set(!this.isAddProduct());
    this.selectedProduct.set(null); 
  }

  get activePercentage(): number {
    const total = this.products()?.totalCount ?? 0;
    const active = this.products()?.activeCount ?? 0;

    if (total === 0) return 0;

    return (active / total) * 100;
  }
}
