import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AllProductResponse } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getHomeData(filters?: any) {
    let params = new HttpParams();

    if (filters) {
      if (filters.productName) {
        params = params.set('ProductName', filters.productName);
      }

      if (filters.minPrice) {
        params = params.set('MinPrice', filters.minPrice);
      }

      if (filters.maxPrice) {
        params = params.set('MaxPrice', filters.maxPrice);
      }

      if (filters.categoryId) {
        params = params.set('CategoryId', filters.categoryId);
      }

      if (filters.isHot !== undefined) {
        params = params.set('IsHot', filters.isHot);
      }

      if (filters.page) {
        params = params.set('page', filters.page);
      }
    }

    return this.http.get<AllProductResponse>(`${environment.apiUrl}/api/Customer/HomeData/Index`, {
      params,
    });
  }

  getProductDetails(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + `/api/Customer/HomeData/Details/${id}`);
  }
}
