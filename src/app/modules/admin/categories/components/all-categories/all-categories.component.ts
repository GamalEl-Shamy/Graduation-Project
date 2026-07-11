import { Component, computed, input, output, signal } from '@angular/core';
import { EmptyComponent } from "../../../shared/empty/empty.component";
import { CategoryItem } from '../../models/category.interface';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-all-categories',
  imports: [EmptyComponent, SlideIn],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css',
})
export class AllCategoriesComponent {
  categoriesList = input.required<CategoryItem[]>();

  deleteCategory = output<number>();
  editCategory = output<CategoryItem>();

  searchTerm = signal<string>('');
  selectedStatus = signal<string>('All');

  filteredCategories = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const status = this.selectedStatus();
    const categories = this.categoriesList();

    return categories.filter((category) => {
      const categoryName = (category.name || '').toLowerCase();
      const id = String(category.id || '');

      const matchesSearch = !term || categoryName.includes(term) || id.includes(term);

      const categoryStatus = category.status || '';
      const matchesRole = status === 'All' || String(categoryStatus) === status.toLowerCase();

      return matchesSearch && matchesRole;
    });
  });

  updateSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  updateStatus(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStatus.set(selectElement.value);
  }

  onDeleteCategory(categoryId: number) {
    this.deleteCategory.emit(categoryId);
  }

  onEditCategory(category: CategoryItem) {
    this.editCategory.emit(category);
  }
}
