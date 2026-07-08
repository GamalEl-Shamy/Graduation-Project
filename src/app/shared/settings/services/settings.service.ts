import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateProfileRequest, UserProfile } from '../models/settings.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private http = inject(HttpClient);
  
  private baseUrl = `${environment.apiUrl}/api/Identity/Profile`;

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.baseUrl);
  }
  
  updateProfile(data: UpdateProfileRequest): Observable<any> {
    const url = `${this.baseUrl}/UpdateProfile`;
    return this.http.put<any>(url, data);
  }
}
