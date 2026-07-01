import { Component, Input } from '@angular/core';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-shop-header',
  imports: [SlideIn],
  templateUrl: './shop-header.component.html',
  styleUrl: './shop-header.component.css',
})
export class ShopHeaderComponent {
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
