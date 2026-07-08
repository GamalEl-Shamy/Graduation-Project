import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError, Observable, throwError } from 'rxjs';
import { AddRatingResponse } from '../models/add-rating-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);

  addRating(productId: number, ratingValue: number): Observable<AddRatingResponse> {
    const url = `${environment.apiUrl}/api/Customer/Review/AddRating`;

    const body = new HttpParams()
      .set('productId', productId.toString())
      .set('ratingValue', ratingValue.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<AddRatingResponse>(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error || error.message; 
    }
    return throwError(() => new Error(errorMessage));
  }
}
