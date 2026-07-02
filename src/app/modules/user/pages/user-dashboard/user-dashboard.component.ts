import { Component, signal } from '@angular/core';
import { GardenInsightsComponent } from '../../components/dashboard/garden-insights/garden-insights.component';
import { OverviewComponent } from '../../components/dashboard/overview/overview.component';
import { WelcomeMessageComponent } from '../../components/welcome-message/welcome-message.component';
import { WelcomeComponent } from '../../components/dashboard/welcome/welcome.component';
import { WhetherSectionComponent } from "../../components/wheather/whether-section/whether-section.component";
import { DiagnosisHeroComponent } from "../../components/dashboard/diagnosis-hero/diagnosis-hero.component";
import { CropCoverageComponent } from "../../components/dashboard/crop-coverage/crop-coverage.component";

@Component({
  selector: 'app-user-dashboard',
  imports: [
    WelcomeComponent,
    OverviewComponent,
    GardenInsightsComponent,
    WelcomeMessageComponent,
    WhetherSectionComponent,
    DiagnosisHeroComponent,
    CropCoverageComponent
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
