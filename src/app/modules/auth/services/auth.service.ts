import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

   saveAccessToken(accessToken: string): void {
      if (typeof window != 'undefined') {
         localStorage.setItem('accessToken', accessToken);
      }
   }

   saveRefreshToken(refreshToken: string): void {
      if (typeof window != 'undefined') {
         localStorage.setItem('refreshToken', refreshToken);
      }
   }

   getAccessToken(): string | null {
      if (typeof window != 'undefined') {
         return localStorage.getItem('accessToken');
      }
      return null;
   }

   getRefreshToken(): string | null {
      if (typeof window != 'undefined') {
         return localStorage.getItem('refreshToken');
      }
      return null;
   }

   isLoggedIn(): boolean {
      return !!this.getAccessToken() || !!this.getRefreshToken();
   }

   logout() {
      if (typeof window != 'undefined') {
         this.router.navigate(['/visitor'])
         localStorage.removeItem('accessToken');
         localStorage.removeItem('refreshToken');
      }
   }

   decodeToken(): null {
      try {
         const AccessToken = this.getAccessToken();
         if (!AccessToken) return null;
         // this.getUserData();
         return jwtDecode(AccessToken);
      } catch (error) {
         this.logout();
         return null;
      }
   }

   getUserData() {
      const decoded = this.decodeToken();
      
      return {
         name: decoded!["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
         email: decoded!["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
         role: decoded!["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
         id: decoded!["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
      };
   }

   saveUserData() {
      const user = this.getUserData();

      if (typeof window != 'undefined') {
         localStorage.setItem('userFirstNameZaraa', user.name);
         localStorage.setItem('userEmailZaraa', user.email);
         localStorage.setItem('userRoleZaraa', user.role);
         // localStorage.setItem('userIdZaraa', user.id);
      }
   }

   refreshToken(accessToken:string, refreshTokenInput:string): Observable<any> {
      return this.http.post(environment.apiUrl + '/api/Identity/Account/refresh', 
         {
            accessToken: accessToken,
            refreshToken: refreshTokenInput
         });
   }



  register(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/Identity/Account/Register', data, {
      responseType: 'text',
    });
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/Identity/Account/Login', data);
  }

  confirmEmail(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/Identity/Account/ConfirmEmail');
  }

  resendEmailConfirmation(data: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/api/Identity/Account/ResendEmailConfirmation',
      data,
    );
  }

  forgetPassword(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/Identity/Account/ForgetPassword', data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/Identity/Account/ResetPassword', data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/Identity/Account/ChangePassword', data);
  }

   
}
