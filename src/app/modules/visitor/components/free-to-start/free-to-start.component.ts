import { Component } from '@angular/core';
import { SlideIn } from "../../../../shared/directives/slide-in";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-free-to-start',
  imports: [SlideIn, RouterLink],
  templateUrl: './free-to-start.component.html',
  styleUrl: './free-to-start.component.css',
})
export class FreeToStartComponent {

}
