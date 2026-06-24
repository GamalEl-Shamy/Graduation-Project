import { Component, inject, signal } from '@angular/core';
import { DashboardHeaderComponent } from "../../components/dashboard-header/dashboard-header.component";
import { AmbientBackgroundComponent } from "../../../shared/ambient-background/ambient-background.component";
import { UserService } from '../../../users/services/user.service';
import { UserResponse } from '../../../users/models/user.interface';
import { CategoriesService } from '../../../categories/services/categories.service';
import { CategoryResponse } from '../../../categories/models/category.interface';
import { BrandsService } from '../../../brands/services/brands.service';
import { Brand } from '../../../brands/models/brand.interface';
import { ProductService } from '../../../products/services/product.service';
import { ProductResponse } from '../../../products/models/product.interface';
import { OrdersService } from '../../../orders/services/orders.service';
import { OrderResponse } from '../../../orders/models/order.interface';
import { DashboardDetailsComponent } from "../../components/dashboard-details/dashboard-details.component";
import { DashboardActionsComponent } from "../../components/dashboard-actions/dashboard-actions.component";
import { DiagnoisHistorySkeletonsComponent } from "../../../../user/skeletons/diagnois-history-skeletons/diagnois-history-skeletons.component";
import { SkeletonDashboardComponent } from "../../components/skeleton-dashboard/skeleton-dashboard.component";

@Component({
  selector: 'app-dashboard',
  imports: [DashboardHeaderComponent, AmbientBackgroundComponent, DashboardDetailsComponent, DashboardActionsComponent, SkeletonDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  userFirstName: string = '';
  userRole: string = '';
  char: string = '';

  isProcessing = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  private usersService = inject(UserService);
  private categoriesService = inject(CategoriesService);
  private brandsService = inject(BrandsService);
  private productsService = inject(ProductService);
  private ordersService = inject(OrdersService);

  usersInfo = signal<UserResponse | null>(null);
  categories = signal<CategoryResponse | null>(null);
  brands = signal<Brand | null>(null);
  products = signal<ProductResponse | null>(null);
  ordersInfo = signal<OrderResponse | null>(null);

  ngOnInit(): void {
    if (typeof window != 'undefined') {
      this.userFirstName = localStorage.getItem('userFirstNameZaraa')!;
      this.userRole = localStorage.getItem('userRoleZaraa')!;
      if (this.userFirstName && this.userFirstName.length > 0) {
        this.char = this.userFirstName[0]!.toUpperCase();
      }
    }

    this.loadUsers();
    this.loadCategories();
    this.loadBrands();
    this.loadProducts();
    this.loadOrders();
  }

  loadUsers(): void {
    this.isProcessing.set(true);
    this.errorMessage.set(null);

    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        this.usersInfo.set(response);
        this.isProcessing.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load users. Please try again later.');
        this.isProcessing.set(false);
      },
    });
  }

  loadCategories(): void {
    this.errorMessage.set(null);

    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categories.set(response);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load categories. Please try again later.');
      },
    });
  }

  loadBrands(): void {
    this.errorMessage.set(null);

    this.brandsService.getAllBrands().subscribe({
      next: (response) => {
        this.brands.set(response);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load brands. Please try again later.');
      },
    });
  }

  loadProducts(): void {
    this.errorMessage.set(null);

    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products.set(response);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load products. Please try again later.');
      },
    });
  }

  loadOrders(): void {
    this.errorMessage.set(null);

    this.ordersService.getAllOrders().subscribe({
      next: (response) => {
        this.ordersInfo.set(response);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load orders. Please try again later.');
      },
    });
  }
}
