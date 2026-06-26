import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { AuthService } from '../../modules/auth/services/auth.service';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, FooterComponent, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent implements OnInit {
  themeService = inject(ThemeService);
  authService = inject(AuthService);

  isSidebarOpen = signal(true); //false
  userFirstName: string = '';
  userRole: string = '';
  char: string = '';

  ngOnInit(): void {
    if (typeof window != 'undefined') {
      this.userFirstName = localStorage.getItem('userFirstNameZaraa')!;
      this.userRole = localStorage.getItem('userRoleZaraa')!;
      if (this.userFirstName && this.userFirstName.length > 0) {
        this.char = this.userFirstName[0]!.toUpperCase();
      }
    }
  }

  toggleSidebar() {
    this.isSidebarOpen.update((state) => !state);
  }

  closeSidebar() {
    this.isSidebarOpen.set(true);
  }
}
