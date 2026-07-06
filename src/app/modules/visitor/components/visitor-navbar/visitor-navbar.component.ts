import { Component, inject, output, signal } from '@angular/core';
import { ThemeService } from '../../../../shared/services/theme.service';
import { RouterLinkWithHref } from '@angular/router';
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-visitor-navbar',
  imports: [RouterLinkWithHref, SlideIn],
  templateUrl: './visitor-navbar.component.html',
  styleUrl: './visitor-navbar.component.css',
})
export class VisitorNavbarComponent {
  themeService = inject(ThemeService);

  scrollTHero = output<void>();
  scrollToFeatures = output<void>();
  scrollToWorks = output<void>();
  isOpenDiagnosis = output<void>();
  isOpenRobot = output<void>();
  isOpenMarketplace = output<void>();
  isOpenWeather = output<void>();
  isOpenDashboard = output<void>();
  isOpenTestimonials = output<void>();
  isOpenFreeToStart = output<void>();

  isOpenNav = signal<boolean>(true);

  toggleSidebar() {
    this.isOpenNav.update((state) => !state);
  }

  closeSidebar() {
    this.isOpenNav.set(true);
  }
}
