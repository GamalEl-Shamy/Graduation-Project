import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ScanResponse } from '../models/robot.interface';

@Injectable({
  providedIn: 'root',
})
export class RobotService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/Customer/RobotScan`;

  startScan(): Observable<any> {
    return this.http.post(`${this.baseUrl}/Start`, {});
  }

  stopScan(): Observable<any> {
    return this.http.post(`${this.baseUrl}/Stop`, {});
  }

  getLatestScan(): Observable<ScanResponse> {
    return this.http.get<ScanResponse>(`${this.baseUrl}/ScanLatest`);
  }
}
