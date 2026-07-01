import { Component, input } from '@angular/core';
import { ApplicationUser } from '../../../models/cart.interface';
import { CartUserInformationSkeletonComponent } from '../../../skeletons/cart-user-information-skeleton/cart-user-information-skeleton.component';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-cart-user-information',
  imports: [CartUserInformationSkeletonComponent, SlideIn],
  templateUrl: './cart-user-information.component.html',
  styleUrl: './cart-user-information.component.css',
})
export class CartUserInformationComponent {
  userInformation = input<ApplicationUser | null>(null);
}
