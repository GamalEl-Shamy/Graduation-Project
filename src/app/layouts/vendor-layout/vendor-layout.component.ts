import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vendor-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './vendor-layout.component.html',
  styleUrl: './vendor-layout.component.css',
})
export class VendorLayoutComponent {

}
