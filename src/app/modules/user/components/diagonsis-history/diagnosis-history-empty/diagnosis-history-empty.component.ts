import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-diagnosis-history-empty',
  imports: [RouterLink, SlideIn],
  templateUrl: './diagnosis-history-empty.component.html',
  styleUrl: './diagnosis-history-empty.component.css',
})
export class DiagnosisHistoryEmptyComponent {

}
