import { Component, computed, input } from '@angular/core';
import { CategoryResponse } from '../../models/category.interface';

@Component({
  selector: 'app-categories-overview',
  imports: [],
  templateUrl: './categories-overview.component.html',
  styleUrl: './categories-overview.component.css',
})
export class CategoriesOverviewComponent {
  categories = input.required<CategoryResponse>();

  activePercentage = computed(() => {
    const info = this.categories();
    const total = info?.totalCount ?? 0;
    const active = info?.activeCount ?? 0;

    return total === 0 ? 0 : (active / total) * 100;
  });
}
