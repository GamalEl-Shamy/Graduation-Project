import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-visitor-layout',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './visitor-layout.component.html',
  styleUrl: './visitor-layout.component.css',
})
export class VisitorLayoutComponent {

}
