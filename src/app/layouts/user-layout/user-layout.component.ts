import { Component, OnInit, signal } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, FooterComponent, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent  implements OnInit {
  isSidebarOpen = signal(false);
  userFirstName:string = "";
  userRole:string  = "";
  char:string  = "";


  ngOnInit(): void {
    if (typeof window != 'undefined') {
      this.userFirstName = localStorage.getItem('userFirstNameZaraa')!;
      this.userRole = localStorage.getItem('userRoleZaraa')!;
      this.char = this.userFirstName[0]!.toUpperCase();
    }
  }

  toggleSidebar() {
    this.isSidebarOpen.update(state => !state);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
