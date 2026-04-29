import { Component } from '@angular/core';
import { WhetherSectionComponent } from "../../components/wheather/whether-section/whether-section.component";

@Component({
  selector: 'app-weather',
  imports: [WhetherSectionComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {

}
