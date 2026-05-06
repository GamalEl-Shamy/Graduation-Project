import { Component, inject, signal } from '@angular/core';
import { Brand, brandItems } from '../../models/brand.interface';
import { BrandsService } from '../../services/brands.service';
import { AddBrandComponent } from '../add-brand/add-brand.component';
import { ToastComponent } from '../../../../user/components/shared/toast/toast.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { SkeletonAdminComponent } from "../../../shared/skeleton-admin/skeleton-admin.component";
import { EmptyBrandComponent } from "../empty-brand/empty-brand.component";

@Component({
  selector: 'app-all-brands',
  imports: [AddBrandComponent, ToastComponent, LoadingComponent, SkeletonAdminComponent, EmptyBrandComponent],
  templateUrl: './all-brands.component.html',
  styleUrl: './all-brands.component.css',
})
export class AllBrandsComponent {
  isAddBrand = signal(false);

  private brandsService = inject(BrandsService);

  brands = signal<Brand | null>(null);
  brandsList = signal<brandItems[]>([]);

  isLoading = signal<boolean>(true);
  isDeleted = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successDeletedMessage = signal<string | null>(null);

  selectedBrand = signal<brandItems | null>(null);

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.brandsService.getAllBrands().subscribe({
      next: (response) => {
        this.brands.set(response);
        this.brandsList.set(response.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
        this.errorMessage.set('Failed to load brands. Please try again later.');
        this.isLoading.set(false);
      },
    });
  }

  deleteBrand(id: number) {
    const isConfirmed = confirm('Are you sure you want to delete this brand?');

    if (isConfirmed) {
      this.isDeleted.set(true);
      this.brandsService.deleteBrand(id).subscribe({
        next: (response) => {
          this.successDeletedMessage.set('Brand deleted successfully.');
          this.isDeleted.set(false);
          setTimeout(() => {
            this.successDeletedMessage.set(null);
          }, 3000);
          this.loadBrands();
        },
        error: (error) => {
          console.error('Error deleting brand:', error);
          this.isDeleted.set(false);
          alert('Failed to delete brand. Please try again later.');
        },
      });
    }
  }

  openEditModal(brand: brandItems) {
    this.selectedBrand.set(brand);
    this.isAddBrand.set(true);
  }

  toggleAddBrand() {
    this.isAddBrand.set(!this.isAddBrand());
    this.selectedBrand.set(null);
  }

  get activePercentage(): number {
    const total = this.brands()?.totalCount ?? 0;
    const active = this.brands()?.activeCount ?? 0;

    if (total === 0) return 0;

    return (active / total) * 100;
  }
}
