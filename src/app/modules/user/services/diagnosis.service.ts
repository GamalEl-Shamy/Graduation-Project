import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiagnosisResult } from '../models/diagnosis-result.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DiagnosisService {
  private http = inject(HttpClient);

  classifyPlant(imageFile: File): Observable<DiagnosisResult> {
    const formData = new FormData();
    formData.append('Image', imageFile); 

    return this.http.post<DiagnosisResult>(`${environment.apiUrl}/api/Customer/PlantClassifier/Classify`, formData);
  }
}
