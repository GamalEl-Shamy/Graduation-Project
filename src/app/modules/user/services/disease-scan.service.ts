import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiseaseScanResult } from '../models/disease-scan-result.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DiseaseScanService {
  private http = inject(HttpClient);
  
  private apiUrl = `${environment.apiUrl}/api/Customer/DiseaseScan`;

  scanPlant(plantName: string, imageFile: File): Observable<DiseaseScanResult> {
    const formData = new FormData();
    formData.append('PlantName', plantName);
    formData.append('Image', imageFile);

    return this.http.post<DiseaseScanResult>(`${this.apiUrl}/Scan`, formData);
  }

  getScanHistory(): Observable<DiseaseScanResult[]> {
    return this.http.get<DiseaseScanResult[]>(`${this.apiUrl}/History`);
  }

  getScanDetails(id: number): Observable<DiseaseScanResult> {
    return this.http.get<DiseaseScanResult>(`${this.apiUrl}/Details/${id}`);
  }

  deleteScan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete/${id}`);
  }
}
