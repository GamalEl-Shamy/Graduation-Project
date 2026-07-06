import { Component } from '@angular/core';
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-weather-preview',
  imports: [SlideIn],
  templateUrl: './weather-preview.component.html',
  styleUrl: './weather-preview.component.css',
})
export class WeatherPreviewComponent {

}
