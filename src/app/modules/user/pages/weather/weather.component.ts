import { Component } from '@angular/core';
import { EnvironmentComponent } from "../../components/environment/environment.component";

@Component({
  selector: 'app-weather',
  imports: [EnvironmentComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {

}
