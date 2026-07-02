import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-garden-insights',
  imports: [RouterLink, SlideIn],
  templateUrl: './garden-insights.component.html',
  styleUrl: './garden-insights.component.css',
})
export class GardenInsightsComponent {

}
