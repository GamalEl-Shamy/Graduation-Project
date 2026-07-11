import { Component } from '@angular/core';
import { AddBrandComponent } from "../../components/add-brand/add-brand.component";
import { AmbientBackgroundComponent } from "../../../shared/ambient-background/ambient-background.component";
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-add-new-brand',
  imports: [AddBrandComponent, AmbientBackgroundComponent, SlideIn],
  templateUrl: './add-new-brand.component.html',
  styleUrl: './add-new-brand.component.css',
})
export class AddNewBrandComponent {

}
