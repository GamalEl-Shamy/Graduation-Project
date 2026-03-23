import { HttpClient } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather.interface';
import { DatePipe } from '@angular/common';
import { EnvironmentSkeletonComponent } from "../../skeletons/environment-skeleton/environment-skeleton.component";

@Component({
  selector: 'app-environment',
  imports: [DatePipe, EnvironmentSkeletonComponent],
  templateUrl: './environment.component.html',
  styleUrl: './environment.component.css',
})
export class EnvironmentComponent {
  isDashboard = input<boolean>(false);
  private weatherService = inject(WeatherService);

  weatherData = signal<Weather | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.searchCity('Cairo');
  }

  searchCity(cityName: string) {
    const cityToSearch = cityName.trim() ? cityName.trim() : 'Cairo';

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.weatherService.getWeather(cityToSearch).subscribe({
      next: (response) => {
        this.weatherData.set(response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage.set('The city was not found.');
        this.weatherData.set(null);
        this.isLoading.set(false);
      },
    });
  }
}
