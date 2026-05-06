import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProductItem, ProductResponse } from '../models/product.interface';
import { ProductRequest } from '../models/create-product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/apiAdmin/Products';

  getAllProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/Index`);
  }

  getProductDetails(productId: number): Observable<ProductItem> {
    return this.http.get<ProductItem>(`${this.apiUrl}/Details/${productId}`);
  }

  createProduct(productData: ProductRequest): Observable<any> {
    const formData = this.buildFormData(productData);
    return this.http.post(`${this.apiUrl}/Create`, formData, { responseType: 'text' });
  }

  updateProduct(id: number, productData: ProductRequest): Observable<any> {
    const formData = this.buildFormData(productData);
    return this.http.put(`${this.apiUrl}/Edit/${id}`, formData, { responseType: 'text' });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`, { responseType: 'text' });
  }

  private buildFormData(data: ProductRequest): FormData {
    const formData = new FormData();
    
    formData.append('Name', data.name);
    
    if (data.description) {
      formData.append('Description', data.description);
    }
    
    formData.append('Status', String(data.status));
    formData.append('Price', String(data.price));
    formData.append('Quantity', String(data.quantity));
    formData.append('Discount', String(data.discount));
    formData.append('CategoryId', String(data.categoryId));
    formData.append('BrandId', String(data.brandId));

    if (data.mainImg) {
      formData.append('MainImg', data.mainImg);
    }

    return formData;
  }
}
