import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-diagnosis-hero',
  imports: [RouterLink, SlideIn],
  templateUrl: './diagnosis-hero.component.html',
  styleUrl: './diagnosis-hero.component.css',
})
export class DiagnosisHeroComponent {

}
