import { Component, Input } from '@angular/core';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-diagnosis-header',
  imports: [SlideIn],
  templateUrl: './diagnosis-header.component.html',
  styleUrl: './diagnosis-header.component.css',
})
export class DiagnosisHeaderComponent {
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
