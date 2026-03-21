import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http:HttpClient){}

  register(data:any): Observable<any>{
     return this.http.post(environment.apiUrl + '/api/Identity/Account/Register', data, { responseType: 'text' })
  }

  login(data:any): Observable<any>{
     return this.http.post(environment.apiUrl + '/api/Identity/Account/Login', data)
  }

  confirmEmail(): Observable<any>{
     return this.http.get(environment.apiUrl + '/api/Identity/Account/ConfirmEmail')
  }

  resendEmailConfirmation(data:any): Observable<any>{
     return this.http.post(environment.apiUrl + '/api/Identity/Account/ResendEmailConfirmation', data)
  }

  forgetPassword(data:any): Observable<any>{
     return this.http.post(environment.apiUrl + '/api/Identity/Account/ForgetPassword', data)
  }

  resetPassword(data:any): Observable<any>{
     return this.http.post(environment.apiUrl + '/api/Identity/Account/ResetPassword', data)
  }

  changePassword(data:any): Observable<any>{
     return this.http.post(environment.apiUrl + '/api/Identity/Account/ChangePassword', data)
  }
}
