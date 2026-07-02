import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-overview',
  imports: [RouterLink, SlideIn],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {

}
