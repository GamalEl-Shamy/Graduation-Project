import { Component, computed, inject, input, signal } from '@angular/core';
import { Carts } from '../../models/cart.interface';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../../../environments/environment.development';
import { RouterLink } from "@angular/router";
import { OrderSummarySkeletonComponent } from "../../skeletons/order-summary-skeleton/order-summary-skeleton.component";
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-order-summary',
  imports: [RouterLink, OrderSummarySkeletonComponent, SlideIn],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {

  private cartService = inject(CartService);

  cartData = signal<Carts | null>(null);
  isActive = input<boolean>(false);
  deletedProductMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  readonly imgBaseUrl = environment.apiUrl + '/Images/';

  cartItems = computed(() => this.cartData()?.carts || []);
  

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (res) => {
        this.cartData.set(res);
        this.errorMessage.set(null);
      },
      error: (err) => {
        this.errorMessage.set(err || 'Error! try again.');
      },
    });
  }

}
