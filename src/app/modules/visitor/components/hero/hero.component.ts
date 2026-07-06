import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-hero',
  imports: [RouterLink, SlideIn],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {

}
