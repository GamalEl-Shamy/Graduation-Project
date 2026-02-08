import { Component, signal } from '@angular/core';
import { EnvironmentComponent } from "../../components/environment/environment.component";
import { GardenInsightsComponent } from "../../components/garden-insights/garden-insights.component";
import { OverviewComponent } from "../../components/overview/overview.component";
import { WelcomeComponent } from "../../components/welcome/welcome.component";

@Component({
  selector: 'app-user-dashboard',
  imports: [ WelcomeComponent, EnvironmentComponent, OverviewComponent, GardenInsightsComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.update(state => !state);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
