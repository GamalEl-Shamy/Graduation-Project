import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SupportedPlant } from '../models/plant-detection.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AiDetectionService {
  private http = inject(HttpClient);
  
  predictDisease(plantName: SupportedPlant, imageFile: File): Observable<any> {
    const formData = new FormData();
    
    formData.append('plant_name', plantName);
    formData.append('file', imageFile);

    return this.http.post(environment.aiAPI + `/predict`, formData);
  }
}
