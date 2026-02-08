import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {

  currentYear = new Date().getFullYear();
  
  quickLinks = [
    { name: 'Home', path: '/users/dashboard' },
    { name: 'Diagnosis', path: '/users/diagnosis' },
    { name: 'My Garden', path: '/users/my-garden' },
    { name: 'Shop', path: '/users/shop' }
  ];
}
