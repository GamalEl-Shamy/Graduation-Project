import { Component, computed, input } from '@angular/core';
import { Brand } from '../../models/brand.interface';

@Component({
  selector: 'app-brands-overview',
  imports: [],
  templateUrl: './brands-overview.component.html',
  styleUrl: './brands-overview.component.css',
})
export class BrandsOverviewComponent {
  brands = input.required<Brand>();

  activePercentage = computed(() => {
    const info = this.brands();
    const total = info?.totalCount ?? 0;
    const active = info?.activeCount ?? 0;

    return total === 0 ? 0 : (active / total) * 100;
  });
}
