import { Component } from '@angular/core';
import { SlideIn } from "../../../../shared/directives/slide-in";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-marketplace-preview',
  imports: [SlideIn, RouterLink],
  templateUrl: './marketplace-preview.component.html',
  styleUrl: './marketplace-preview.component.css',
})
export class MarketplacePreviewComponent {

}
