import { Component } from '@angular/core';
import { DiagnosisHistorySectionComponent } from "../../components/diagonsis-history/diagnosis-history-section/diagnosis-history-section.component";
import { DiagnosisHistoryHeaderComponent } from "../../components/diagonsis-history/diagnosis-history-header/diagnosis-history-header.component";

@Component({
  selector: 'app-diagnosis-history',
  imports: [DiagnosisHistorySectionComponent, DiagnosisHistoryHeaderComponent],
  templateUrl: './diagnosis-history.component.html',
  styleUrl: './diagnosis-history.component.css',
})
export class DiagnosisHistoryComponent {



}
