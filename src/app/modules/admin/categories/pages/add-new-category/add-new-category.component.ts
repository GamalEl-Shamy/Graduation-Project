import { Component } from '@angular/core';
import { AddCategoryComponent } from "../../components/add-category/add-category.component";
import { AmbientBackgroundComponent } from "../../../shared/ambient-background/ambient-background.component";
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-add-new-category',
  imports: [AddCategoryComponent, AmbientBackgroundComponent, SlideIn],
  templateUrl: './add-new-category.component.html',
  styleUrl: './add-new-category.component.css',
})
export class AddNewCategoryComponent {

}
