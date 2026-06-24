import { Component } from '@angular/core';
import { AddCategoryComponent } from "../../components/add-category/add-category.component";
import { AmbientBackgroundComponent } from "../../../shared/ambient-background/ambient-background.component";

@Component({
  selector: 'app-add-new-category',
  imports: [AddCategoryComponent, AmbientBackgroundComponent],
  templateUrl: './add-new-category.component.html',
  styleUrl: './add-new-category.component.css',
})
export class AddNewCategoryComponent {

}
