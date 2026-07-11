import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-dashboard-header',
  imports: [DatePipe, SlideIn],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css',
})
export class DashboardHeaderComponent {
  firstName = input.required<string>();
  role = input.required<string>();
  firstChar = input.required<string>();

  today = new Date();
}
