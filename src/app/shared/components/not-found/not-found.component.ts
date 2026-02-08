import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, FooterComponent, NavbarComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {

}
