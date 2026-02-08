import { Component } from '@angular/core';
import { TopSectionComponent } from "../../components/top-section/top-section.component";
import { HighlightsComponent } from "../../components/highlights/highlights.component";
import { PropositionComponent } from "../../components/proposition/proposition.component";
import { ServicesComponent } from "../../components/services/services.component";
import { WhyChooseComponent } from "../../components/why-choose/why-choose.component";
import { ProtectPlantComponent } from "../../components/protect-plant/protect-plant.component";
import { ReadyComponent } from "../../components/ready/ready.component";

@Component({
  selector: 'app-home-visitor',
  imports: [TopSectionComponent, HighlightsComponent, PropositionComponent, ServicesComponent, WhyChooseComponent, ProtectPlantComponent, ReadyComponent],
  templateUrl: './home-visitor.component.html',
  styleUrl: './home-visitor.component.css',
})
export class HomeVisitorComponent {

}
