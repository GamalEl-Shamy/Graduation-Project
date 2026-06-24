import { Component, computed, input } from '@angular/core';
import { ProductResponse } from '../../models/product.interface';

@Component({
  selector: 'app-products-overview',
  imports: [],
  templateUrl: './products-overview.component.html',
  styleUrl: './products-overview.component.css',
})
export class ProductsOverviewComponent {
  products = input.required<ProductResponse>();

  activePercentage = computed(() => {
    const info = this.products();
    const total = info?.totalCount ?? 0;
    const active = info?.activeCount ?? 0;

    return total === 0 ? 0 : (active / total) * 100;
  });
}
