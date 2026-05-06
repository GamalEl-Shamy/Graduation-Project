import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { OrderDetail, OrderResponse } from '../models/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/api/Admin/Orders';

  getAllOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/GetAll`);
  }

  getOrderById(id: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrl}/Get/${id}`);
  }

  markAsShipped(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/Shipped/${id}`, {}, { responseType: 'text' });
  }

  markAsCompleted(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/Complete/${id}`, {}, { responseType: 'text' });
  }

  markAsCanceled(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/Canceled/${id}`, {}, { responseType: 'text' });
  }
}
