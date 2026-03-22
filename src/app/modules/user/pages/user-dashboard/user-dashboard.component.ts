import { Component, signal } from '@angular/core';
import { EnvironmentComponent } from '../../components/environment/environment.component';
import { GardenInsightsComponent } from '../../components/garden-insights/garden-insights.component';
import { OverviewComponent } from '../../components/overview/overview.component';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { WelcomeMessageComponent } from '../../components/welcome-message/welcome-message.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [
    WelcomeComponent,
    EnvironmentComponent,
    OverviewComponent,
    GardenInsightsComponent,
    WelcomeMessageComponent,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  WelcomeCardState = signal<boolean>(false);
  isSidebarOpen = signal(false);

  ngOnInit() {
    if (typeof window != 'undefined') {
      const hasSeenWelcome = localStorage.getItem('welcomeState');
      if (hasSeenWelcome === 'true') {
        this.WelcomeCardState.set(true);
      }
    }
  }

  toggleSidebar() {
    this.isSidebarOpen.update((state) => !state);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  closeWelcomeMessage() {
    this.WelcomeCardState.set(false);
  }
}
