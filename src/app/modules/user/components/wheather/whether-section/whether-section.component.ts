import { Component, inject, input, signal } from '@angular/core';
import { Weather } from '../../../models/weather.interface';
import { WeatherService } from '../../../services/weather.service';
import { DatePipe } from '@angular/common';
import { EnvironmentSkeletonComponent } from "../../../skeletons/environment-skeleton/environment-skeleton.component";
import { WhetherHeaderComponent } from "../whether-header/whether-header.component";

@Component({
  selector: 'app-whether-section',
  imports: [DatePipe, EnvironmentSkeletonComponent, WhetherHeaderComponent],
  templateUrl: './whether-section.component.html',
  styleUrl: './whether-section.component.css',
})
export class WhetherSectionComponent {
  
  isDashboard = input<boolean>(false);
  private weatherService = inject(WeatherService);

  weatherData = signal<Weather | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.searchCity('Cairo');
    console.log( "First ");
  }

  searchCity(cityName: string) {
    const cityToSearch = cityName.trim() ? cityName.trim() : 'Cairo';

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.weatherService.getWeather(cityToSearch).subscribe({
      next: (response) => {
        this.weatherData.set(response);
        this.isLoading.set(false);
        console.log( "gggggggggggg");
        console.log( response);
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
