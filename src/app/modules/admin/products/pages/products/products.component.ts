import { Component, inject, signal } from '@angular/core';
import { environment } from '../../../../../../environments/environment.development';
import { AmbientBackgroundComponent } from "../../../shared/ambient-background/ambient-background.component";
import { EmptyComponent } from "../../../shared/empty/empty.component";
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { SkeletonAdminComponent } from "../../../shared/skeleton-admin/skeleton-admin.component";
import { ToastComponent } from "../../../shared/toast/toast.component";
import { AllProductsComponent } from "../../components/all-products/all-products.component";
import { ProductsHeaderComponent } from "../../components/products-header/products-header.component";
import { ProductsOverviewComponent } from "../../components/products-overview/products-overview.component";
import { ProductItem, ProductResponse } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { AddNewProductComponent } from "../add-new-product/add-new-product.component";

@Component({
  selector: 'app-products',
  imports: [AddNewProductComponent, ToastComponent, LoadingComponent, SkeletonAdminComponent, AllProductsComponent, ProductsOverviewComponent, ProductsHeaderComponent, AmbientBackgroundComponent, EmptyComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  
  private productsService = inject(ProductService);
  readonly imgUrl = environment.apiUrl + '/Images/';
  
  isAddProduct = signal(false);
  products = signal<ProductResponse | null>(null);
  productsList = signal<ProductItem[]>([]);

  isLoading = signal<boolean>(true);
  isDeleted = signal<boolean>(false);
  isEditProduct = signal<boolean>(false);
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
    this.isEditProduct.set(true);

  }

  toggleAddProduct() {
    this.isAddProduct.set(!this.isAddProduct());
    this.selectedProduct.set(null); 
    this.isEditProduct.set(false);
  }

  get activePercentage(): number {
    const total = this.products()?.totalCount ?? 0;
    const active = this.products()?.activeCount ?? 0;

    if (total === 0) return 0;

    return (active / total) * 100;
  }
}
