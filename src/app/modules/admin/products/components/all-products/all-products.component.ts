import { Component, computed, input, output, signal } from '@angular/core';
import { ProductItem } from '../../models/product.interface';
import { environment } from '../../../../../../environments/environment.development';
import { EmptyComponent } from "../../../shared/empty/empty.component";

@Component({
  selector: 'app-all-products',
  imports: [EmptyComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  productsList = input.required<ProductItem[]>();

    readonly imgUrl = environment.apiUrl + '/Images/';

  deleteProduct = output<number>();
  editProduct = output<ProductItem>();

  searchTerm = signal<string>('');
  selectedStatus = signal<string>('All');
  
  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const status = this.selectedStatus();
    const categories = this.productsList();

    return categories.filter((product) => {
      const productName = (product.name || '').toLowerCase();
      const id = String(product.productId || '');

      const matchesSearch = !term || productName.includes(term) || id.includes(term);

      const productStatus = product.status || '';
      const matchesRole = status === 'All' || String(productStatus) === status.toLowerCase();

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
  
    onDeleteProduct(productId: number) {
      this.deleteProduct.emit(productId);
    }
  
    onEditProduct(product: ProductItem) {
      this.editProduct.emit(product);
    }
}
