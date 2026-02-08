import { Component, signal } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, FooterComponent, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent {
  isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.update(state => !state);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
