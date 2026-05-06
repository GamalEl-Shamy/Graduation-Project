import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { UpdateRoleRequest, UserResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  
  private apiUrl = environment.apiUrl + '/api/Admin/Users';

  getAllUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/Index`);
  }

  toggleLockStatus(userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/LockUnlock/${userId}`, {}, { responseType: 'text' });
  }

  updateUserRole(userId: string, newRole: UpdateRoleRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateRole/${userId}`, newRole, { responseType: 'text' });
  }
}
