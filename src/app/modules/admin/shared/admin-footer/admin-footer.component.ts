import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-admin-footer',
  imports: [RouterLink, SlideIn],
  templateUrl: './admin-footer.component.html',
  styleUrl: './admin-footer.component.css',
})
export class AdminFooterComponent {

}
