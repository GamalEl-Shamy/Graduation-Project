import { Component, DOCUMENT, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserHeaderComponent } from "../../modules/user/components/user-header/user-header.component";
import { UserSidebarComponent } from "../../modules/user/components/user-sidebar/user-sidebar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, FooterComponent, UserSidebarComponent, UserHeaderComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent implements OnInit {
  today = new Date();
  isSidebarOpen = signal(true);
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


  //#region Header Visibility Control
  private document = inject(DOCUMENT);

  isVisible = signal<boolean>(true);
  private lastScrollPosition = 0;

  @HostListener('window:scroll')
  onWindowScroll() {
    const win = this.document.defaultView;

    if (!win) return;

    const currentScrollPosition = win.scrollY || this.document.documentElement.scrollTop || 0;

    if (currentScrollPosition < this.lastScrollPosition || currentScrollPosition === 0) {
      this.isVisible.set(true);
    }

    else if (currentScrollPosition > this.lastScrollPosition && currentScrollPosition > 100) {
      this.isVisible.set(false);
    }

    this.lastScrollPosition = currentScrollPosition;
  }
  //#endregion
}
