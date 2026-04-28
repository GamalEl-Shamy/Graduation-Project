import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/Identity/Profile`;

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.baseUrl);
  }

  updateProfile(data: UserProfile): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateProfile`, data);
  }
}
