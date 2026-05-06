import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../models/category.interface';
import { CategoryRequest } from '../models/create-category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);
  
  private apiUrl = environment.apiUrl + '/api/Admin/Categories';

  getAllCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/Index`);
  }

  createCategory(categoryData: CategoryRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/Create`, categoryData, { responseType: 'text' });
  }

  updateCategory(id: number, categoryData: CategoryRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/Edit/${id}`, categoryData, { responseType: 'text' });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`, { responseType: 'text' });
  }
}
