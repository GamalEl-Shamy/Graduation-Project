import { Component, output } from '@angular/core';

@Component({
  selector: 'app-welcome-message',
  imports: [],
  templateUrl: './welcome-message.component.html',
  styleUrl: './welcome-message.component.css',
})
export class WelcomeMessageComponent {
  onDismiss = output<boolean>();
  user = {
    firstName: 'Gamal',
    lastName: 'Elshamy',
    role: 'Admin',
    projects: 12,
    commits: 340,
    active: 5,
  };

  initials() {
    return this.user.firstName[0] + this.user.lastName[0];
  }

  // Computed or static array for the template loop
  get stats() {
    return [
      { num: this.user.projects, lbl: 'Projects' },
      { num: this.user.commits, lbl: 'Commits' },
      { num: this.user.active, lbl: 'Active' },
    ];
  }

  close() {
    if (typeof window != 'undefined') {
      localStorage.setItem('welcomeState', 'false')
    }
    this.onDismiss.emit(false);
  }
}
