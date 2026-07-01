import { Component, Input } from '@angular/core';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-diagnosis-history-header',
  imports: [SlideIn],
  templateUrl: './diagnosis-history-header.component.html',
  styleUrl: './diagnosis-history-header.component.css',
})
export class DiagnosisHistoryHeaderComponent {
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
