import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  private apiKey = 'L5AFE8ALYP7FLWEQQQRFCKSW8';

  getWeather(city: string): Observable<Weather> {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=${this.apiKey}`;
    
    return this.http.get<Weather>(url);
  }
}
