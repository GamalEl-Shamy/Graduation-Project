import { Component, Input } from '@angular/core';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-cart-header',
  imports: [SlideIn],
  templateUrl: './cart-header.component.html',
  styleUrl: './cart-header.component.css',
})
export class CartHeaderComponent {
 @Input() targetElement!: HTMLElement; 

  scrollToSecondComponent() {
    if (this.targetElement) {
      this.targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'     
      });
    }
  }
}
