import { Component } from '@angular/core';
import { DiagnosisSectionComponent } from "../../components/diagnosis/diagnosis-section/diagnosis-section.component";
import { DiagnosisHeaderComponent } from "../../components/diagnosis/diagnosis-header/diagnosis-header.component";

@Component({
  selector: 'app-diagnosis',
  imports: [DiagnosisSectionComponent, DiagnosisHeaderComponent],
  templateUrl: './diagnosis.component.html',
  styleUrl: './diagnosis.component.css',
})
export class DiagnosisComponent {

  
}
