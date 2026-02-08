import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  @Input() authType: string = ''
  isMobile: boolean = true;
  menuOpen: boolean = false;
  cartCounter: number = 0
  wishlistCounter: number = 0

  mobileToggle() {
    this.isMobile = !this.isMobile
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.isMobile = true;
    this.menuOpen = false;
  }

  
}
