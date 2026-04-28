import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);

  addToCart(productId: number, count: number): Observable<any> {
    const params = new HttpParams().set('productId', productId).set('count', count.toString());

    return this.http.post(
      environment.apiUrl + '/api/Customer/Carts/AddToCart',
      {},
      {
        params,
        responseType: 'text' as 'json',
      },
    );
  }

  getCartItems(): Observable<any> {
    return this.http.get(environment.apiUrl + `/api/Customer/Carts/Index`);
  }

  incrementCount(productId: number): Observable<any> {
    return this.http.patch(
      environment.apiUrl + `/api/Customer/Carts/IncrementCount/${productId}`,
      {},
    );
  }

  decrementCount(productId: number): Observable<any> {
    return this.http.patch(
      environment.apiUrl + `/api/Customer/Carts/DecrementCount/${productId}`,
      {},
    );
  }

  removeProductFromCart(productId: number): Observable<any> {
    return this.http.patch(
      environment.apiUrl + `/api/Customer/Carts/DeleteProduct/${productId}`,
      {},
    );
  }

  initiatePayment(): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(environment.apiUrl + `/api/Customer/Carts/Pay`, {});
  }
}
