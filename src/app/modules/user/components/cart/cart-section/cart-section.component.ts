import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../../environments/environment.development';
import { ApplicationUser, Carts } from '../../../models/cart.interface';
import { CartService } from '../../../services/cart.service';
import { CartSkeletonComponent } from '../../../skeletons/cart-skeleton/cart-skeleton.component';
import { OrderSummaryComponent } from '../../order-summary/order-summary.component';
import { ToastComponent } from '../../shared/toast/toast.component';
import { CartUserInformationComponent } from '../cart-user-information/cart-user-information.component';
import { EmptyCartComponent } from '../empty-cart/empty-cart.component';

@Component({
  selector: 'app-cart-section',
  imports: [
    CartUserInformationComponent,
    CartSkeletonComponent,
    RouterLink,
    ToastComponent,
    OrderSummaryComponent,
    EmptyCartComponent,
  ],
  templateUrl: './cart-section.component.html',
  styleUrl: './cart-section.component.css',
})
export class CartSectionComponent {
  private cartService = inject(CartService);

  cartData = signal<Carts | null>(null);
  userInformation = signal<ApplicationUser | null>(null);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);
  deletedProductMessage = signal<string | null>(null);

  readonly imgBaseUrl = environment.apiUrl + '/Images/';

  cartItems = computed(() => this.cartData()?.carts || []);

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.isLoading.set(true);

    this.cartService.getCartItems().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.cartData.set(res);
        if (res?.carts && res.carts.length > 0) {
          this.userInformation.set(res.carts[0].applicationUser);
        } else {
          this.userInformation.set(null);
        }
      },
      error: (err) => {
        this.errorMessage.set(err || 'Error! try again.');
        this.isLoading.set(false);
        setTimeout(() => {
          this.errorMessage.set(null);
        }, 3000);
      },
    });
  }

  cartState = signal<Carts>({ carts: [], totalPrice: 0 });

  increment(productId: number): void {
    this.cartData.update((currentState) => {
      if (!currentState) return currentState;

      const updatedCarts = currentState.carts.map((item) => {
        if (item.productId === productId) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });

      const newTotalPrice = updatedCarts.reduce((total, item) => {
        const priceToUse =
          item.product.priceAfterDiscount > 0
            ? item.product.priceAfterDiscount
            : item.product.price;

        return total + priceToUse * item.count;
      }, 0);

      return {
        ...currentState,
        carts: updatedCarts,
        totalPrice: newTotalPrice,
      };
    });

    this.cartService.incrementCount(productId).subscribe({
      error: (err) => {
        this.errorMessage.set('Failed to increment product. Please try again.' + err);
        this.decrement(productId);
        setTimeout(() => {
          this.errorMessage.set(null);
        }, 3000);
      },
    });
  }

  decrement(productId: number): void {
    this.cartData.update((currentState) => {
      if (!currentState) return currentState;

      const updatedCarts = currentState.carts.map((item) => {
        if (item.productId === productId) {
          if (item.count <= 1) {
            return item;
          }

          return { ...item, count: item.count - 1 };
        }
        return item;
      });

      const newTotalPrice = updatedCarts.reduce((total, item) => {
        const priceToUse =
          item.product.priceAfterDiscount > 0
            ? item.product.priceAfterDiscount
            : item.product.price;

        return total + priceToUse * item.count;
      }, 0);

      return {
        ...currentState,
        carts: updatedCarts,
        totalPrice: newTotalPrice,
      };
    });
    this.cartService.decrementCount(productId).subscribe({
      error: (err) => {
        this.errorMessage.set('Failed to decrement product. Please try again.' + err);
        this.increment(productId);
        setTimeout(() => {
          this.errorMessage.set(null);
        }, 3000);
      },
    });
  }

  // Remove
  removeProduct(productId: number): void {
    this.cartData.update((currentState) => {
      if (!currentState) return currentState;

      const updatedCarts = currentState.carts.filter((item) => item.productId !== productId);

      const newTotalPrice = updatedCarts.reduce((total, item) => {
        const priceToUse =
          item.product.priceAfterDiscount > 0
            ? item.product.priceAfterDiscount
            : item.product.price;
        return total + priceToUse * item.count;
      }, 0);

      return {
        ...currentState,
        carts: updatedCarts,
        totalPrice: newTotalPrice,
      };
    });

    this.cartService.removeProductFromCart(productId).subscribe({
      next: () => {
        this.deletedProductMessage.set('Product removed successfully');
        this.errorMessage.set(null);
        setTimeout(() => {
          this.deletedProductMessage.set(null);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage.set('Failed to remove product. Please try again.' + err);
        this.loadCart();
        this.deletedProductMessage.set(null);
        setTimeout(() => {
          this.errorMessage.set(null);
        }, 3000);
      },
    });
  }
}
