import { Component, inject, OnInit, signal } from '@angular/core';
import { AddCategoryComponent } from "../add-category/add-category.component";
import { CategoriesService } from '../../services/categories.service';
import { CategoryResponse, CategoryItem } from '../../models/category.interface';
import { ToastComponent } from "../../../shared/toast/toast.component";
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { SkeletonAdminComponent } from "../../../shared/skeleton-admin/skeleton-admin.component";
import { EmptyCategoryComponent } from "../empty-category/empty-category.component";

@Component({
  selector: 'app-all-categories',
  imports: [AddCategoryComponent, ToastComponent, LoadingComponent, SkeletonAdminComponent, EmptyCategoryComponent],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css',
})
export class AllCategoriesComponent implements OnInit {
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

  get activePercentage(): number {
    const total = this.categories()?.totalCount ?? 0;
    const active = this.categories()?.activeCount ?? 0;

    if (total === 0) return 0;

    return (active / total) * 100;
  }
}
