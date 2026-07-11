import { Component, computed, input, output, signal } from '@angular/core';
import { EmptyComponent } from "../../../shared/empty/empty.component";
import { brandItems } from '../../models/brand.interface';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-all-brands',
  imports: [EmptyComponent, SlideIn],
  templateUrl: './all-brands.component.html',
  styleUrl: './all-brands.component.css',
})
export class AllBrandsComponent {
  brandsList = input.required<brandItems[]>();

  deleteBrand = output<number>();
  editBrand = output<brandItems>();

  searchTerm = signal<string>('');
  selectedStatus = signal<string>('All');

  filteredBrands = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const status = this.selectedStatus();
    const brands = this.brandsList();

    return brands.filter((brand) => {
      const brandName = (brand.name || '').toLowerCase();
      const id = String(brand.id || '');

      const matchesSearch = !term || brandName.includes(term) || id.includes(term);

      const brandStatus = brand.status || '';
      const matchesRole = status === 'All' || String(brandStatus) === status.toLowerCase();

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
    this.deleteBrand.emit(categoryId);
  }

  onEditCategory(category: brandItems) {
    this.editBrand.emit(category);
  }
}
