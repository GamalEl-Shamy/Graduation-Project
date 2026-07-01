import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-empty-cart',
  imports: [RouterLink, SlideIn],
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.css',
})
export class EmptyCartComponent {

}
