import { Component, inject, input, model, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ThemeService } from '../../../../shared/services/theme.service';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  imports: [RouterLinkWithHref, RouterLinkActive],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css',
})
export class UserSidebarComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);

  char = input.required<string>();
  userFirstName = input.required<string>();
  userRole = input.required<string>();

  isSidebarOpen = model<boolean>(true);


  toggleSidebar() {
    this.isSidebarOpen.update((state) => !state);
  }

  closeSidebar() {
    this.isSidebarOpen.set(true);
  }
}
