import { Component } from '@angular/core';
import { TopSectionComponent } from "../../components/top-section/top-section.component";
import { HighlightsComponent } from "../../components/highlights/highlights.component";
import { PropositionComponent } from "../../components/proposition/proposition.component";
import { ServicesComponent } from "../../components/services/services.component";
import { WhyChooseComponent } from "../../components/why-choose/why-choose.component";
import { ProtectPlantComponent } from "../../components/protect-plant/protect-plant.component";
import { ReadyComponent } from "../../components/ready/ready.component";
import { AiSectionComponent } from "../../components/ai-section/ai-section.component";
import { VisitorNavbarComponent } from "../../components/visitor-navbar/visitor-navbar.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { FeaturesComponent } from "../../components/features/features.component";
import { HowItWorksComponent } from "../../components/how-it-works/how-it-works.component";
import { AiDiagnosisComponent } from "../../components/ai-diagnosis/ai-diagnosis.component";
import { RobotSectionComponent } from "../../components/robot-section/robot-section.component";
import { MarketplacePreviewComponent } from "../../components/marketplace-preview/marketplace-preview.component";
import { WeatherPreviewComponent } from "../../components/weather-preview/weather-preview.component";
import { DashboardPreviewComponent } from "../../components/dashboard-preview/dashboard-preview.component";
import { TestimonialsFaqComponent } from "../../components/testimonials-faq/testimonials-faq.component";
import { FreeToStartComponent } from "../../components/free-to-start/free-to-start.component";

@Component({
  selector: 'app-home-visitor',
  imports: [TopSectionComponent, HighlightsComponent, PropositionComponent, ServicesComponent, WhyChooseComponent, ProtectPlantComponent, ReadyComponent, AiSectionComponent, VisitorNavbarComponent, HeroComponent, FeaturesComponent, HowItWorksComponent, AiDiagnosisComponent, RobotSectionComponent, MarketplacePreviewComponent, WeatherPreviewComponent, DashboardPreviewComponent, TestimonialsFaqComponent, FreeToStartComponent],
  templateUrl: './home-visitor.component.html',
  styleUrl: './home-visitor.component.css',
})
export class HomeVisitorComponent {
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }
}
