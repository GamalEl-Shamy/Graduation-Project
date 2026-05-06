import { Component, inject, signal } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  authService = inject(AuthService);
  role = this.authService.getUserData()?.role;

  isSidebarOpen = signal(false);
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
    this.isSidebarOpen.set(false);
  }
}
