import { Component, inject, signal } from '@angular/core';
import { AmbientBackgroundComponent } from "../../../shared/ambient-background/ambient-background.component";
import { EmptyComponent } from "../../../shared/empty/empty.component";
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { SkeletonAdminComponent } from "../../../shared/skeleton-admin/skeleton-admin.component";
import { ToastComponent } from "../../../shared/toast/toast.component";
import { AddBrandComponent } from "../../components/add-brand/add-brand.component";
import { AllBrandsComponent } from "../../components/all-brands/all-brands.component";
import { BrandsHeaderComponent } from "../../components/brands-header/brands-header.component";
import { BrandsOverviewComponent } from "../../components/brands-overview/brands-overview.component";
import { Brand, brandItems } from '../../models/brand.interface';
import { BrandsService } from '../../services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [AddBrandComponent, ToastComponent, LoadingComponent, SkeletonAdminComponent, AllBrandsComponent, BrandsOverviewComponent, BrandsHeaderComponent, AmbientBackgroundComponent, EmptyComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private brandsService = inject(BrandsService);
  
  isAddBrand = signal(false);
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
