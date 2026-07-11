import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-dashboard-actions',
  imports: [RouterLink, SlideIn],
  templateUrl: './dashboard-actions.component.html',
  styleUrl: './dashboard-actions.component.css',
})
export class DashboardActionsComponent {

}
