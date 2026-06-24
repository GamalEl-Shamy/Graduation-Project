import { Component, input } from '@angular/core';
import { UserResponse } from '../../../users/models/user.interface';
import { CategoryResponse } from '../../../categories/models/category.interface';
import { Brand } from '../../../brands/models/brand.interface';
import { ProductResponse } from '../../../products/models/product.interface';
import { OrderResponse } from '../../../orders/models/order.interface';

@Component({
  selector: 'app-dashboard-details',
  imports: [],
  templateUrl: './dashboard-details.component.html',
  styleUrl: './dashboard-details.component.css',
})
export class DashboardDetailsComponent {
  users = input.required<UserResponse | null>();
  categories = input.required<CategoryResponse | null>();
  brands = input.required<Brand | null>();
  products = input.required<ProductResponse | null>();
  ordersInfo = input.required<OrderResponse | null>();
}
