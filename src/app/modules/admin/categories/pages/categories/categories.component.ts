import { Component, inject, OnInit, signal } from '@angular/core';
import { AmbientBackgroundComponent } from "../../../shared/ambient-background/ambient-background.component";
import { EmptyComponent } from "../../../shared/empty/empty.component";
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { SkeletonAdminComponent } from "../../../shared/skeleton-admin/skeleton-admin.component";
import { ToastComponent } from "../../../shared/toast/toast.component";
import { AddCategoryComponent } from "../../components/add-category/add-category.component";
import { AllCategoriesComponent } from "../../components/all-categories/all-categories.component";
import { CategoriesHeaderComponent } from "../../components/categories-header/categories-header.component";
import { CategoriesOverviewComponent } from "../../components/categories-overview/categories-overview.component";
import { CategoryItem, CategoryResponse } from '../../models/category.interface';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  imports: [ToastComponent, LoadingComponent, AddCategoryComponent, SkeletonAdminComponent, CategoriesHeaderComponent, CategoriesOverviewComponent, AllCategoriesComponent, AmbientBackgroundComponent, EmptyComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit{
  isAddCategory = signal(false);

  private categoriesService = inject(CategoriesService);

  categories = signal<CategoryResponse | null>(null);
  categoriesList = signal<CategoryItem[]>([]);

  isLoading = signal<boolean>(true);
  isDeleted = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successDeletedMessage = signal<string | null>(null);

  selectedCategory = signal<CategoryItem | null>(null);

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categories.set(response);
        this.categoriesList.set(response.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.errorMessage.set('Failed to load categories. Please try again later.');
        this.isLoading.set(false);
      },
    });
  }

  deleteCategory(id: number) {
    const isConfirmed = confirm('Are you sure you want to delete this category?');

    if (isConfirmed) {
      this.isDeleted.set(true);
      this.categoriesService.deleteCategory(id).subscribe({
        next: (response) => {
          this.successDeletedMessage.set('Category deleted successfully.');
          this.isDeleted.set(false);
          setTimeout(() => {
            this.successDeletedMessage.set(null);
          }, 3000);
          this.loadCategories();
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          this.isDeleted.set(false);
          alert('Failed to delete category. Please try again later.');
        },
      });
    }
  }

  openEditModal(category: CategoryItem) {
    this.selectedCategory.set(category);
    this.isAddCategory.set(true);
  }

  toggleAddCategory() {
    this.isAddCategory.set(!this.isAddCategory());
    this.selectedCategory.set(null); 
  }

  
}
