import { Component } from '@angular/core';
import { CartSectionComponent } from "../../components/cart/cart-section/cart-section.component";
import { CartHeaderComponent } from "../../components/cart/cart-header/cart-header.component";

@Component({
  selector: 'app-cart',
  imports: [CartSectionComponent, CartHeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {

}
