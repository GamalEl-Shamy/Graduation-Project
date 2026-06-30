import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-diagnosis-header',
  imports: [],
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
