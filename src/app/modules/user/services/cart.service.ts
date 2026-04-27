import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);

  addToCart(productId: number, count: number) {
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
}
