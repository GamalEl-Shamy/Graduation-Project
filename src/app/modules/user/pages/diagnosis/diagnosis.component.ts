import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { ClassifyDiagnosisComponent } from "../../components/diagnosis/classify-diagnosis/classify-diagnosis.component";
import { DiagnosisHeaderComponent } from "../../components/diagnosis/diagnosis-header/diagnosis-header.component";

@Component({
  selector: 'app-diagnosis',
  imports: [DiagnosisHeaderComponent, ClassifyDiagnosisComponent],
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
