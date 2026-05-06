import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { Brand } from '../models/brand.interface';
import { CreateBrandRequest } from '../models/create-brand-request.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private http = inject(HttpClient);

  getAllBrands(): Observable<Brand> {
    return this.http.get<Brand>(environment.apiUrl + '/apiAdmin/Brands/Index');
  }

  createBrand(brandData: CreateBrandRequest): Observable<any> {
    return this.http.post(environment.apiUrl + `/apiAdmin/Brands/Create`, brandData,{ responseType: 'text' });
  }

  updateBrand(id: number, brandData: CreateBrandRequest): Observable<any> {
    return this.http.put(environment.apiUrl + `/apiAdmin/Brands/Edit/${id}`, brandData, { responseType: 'text' });
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + `/apiAdmin/Brands/Delete/${id}`, { responseType: 'text' });
  }
}
