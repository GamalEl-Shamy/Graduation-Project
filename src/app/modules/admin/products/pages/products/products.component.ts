import { Component } from '@angular/core';
import { AllProductsComponent } from "../../components/all-products/all-products.component";

@Component({
  selector: 'app-products',
  imports: [AllProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {

}
