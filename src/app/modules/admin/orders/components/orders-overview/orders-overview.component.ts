import { Component, computed, input } from '@angular/core';
import { OrderResponse } from '../../models/order.interface';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-orders-overview',
  imports: [SlideIn],
  templateUrl: './orders-overview.component.html',
  styleUrl: './orders-overview.component.css',
})
export class OrdersOverviewComponent {
  orders = input.required<OrderResponse>();

  readonly shippedOrdersPercentage = computed(() => {
    const info = this.orders();
    const total = info?.totalOrders ?? 0;
    const active = info?.shippedOrders ?? 0;

    if (total === 0) return 0;
    return (active / total) * 100;
  });

  readonly pendingOrdersPercentage = computed(() => {
    const info = this.orders();
    const total = info?.totalOrders ?? 0;
    const active = info?.pendingOrders ?? 0;

    if (total === 0) return 0;
    return (active / total) * 100;
  });

  readonly canceledOrdersPercentage = computed(() => {
    const info = this.orders();
    const total = info?.totalOrders ?? 0;
    const active = info?.canceledOrders ?? 0;

    if (total === 0) return 0;
    return (active / total) * 100;
  });
}
