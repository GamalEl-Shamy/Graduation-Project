import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { DiagnosisSectionComponent } from "../../components/diagnosis/diagnosis-section/diagnosis-section.component";
import { DiagnosisHeaderComponent } from "../../components/diagnosis/diagnosis-header/diagnosis-header.component";

@Component({
  selector: 'app-diagnosis',
  imports: [DiagnosisSectionComponent, DiagnosisHeaderComponent],
  templateUrl: './diagnosis.component.html',
  styleUrl: './diagnosis.component.css',
})
export class DiagnosisComponent {

  secondCompContainer = viewChild<ElementRef<HTMLDivElement>>('secondCompWrapper');
  
  isSecondCompVisible = signal<boolean>(false);

  ngAfterViewInit() {
    const element = this.secondCompContainer()?.nativeElement;
    
    if (element) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isSecondCompVisible.set(true);
            observer.unobserve(element);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
    }
  }
  
}
