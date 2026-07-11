import { Component, computed, input, output, signal } from '@angular/core';
import { OrderListItem } from '../../models/order.interface';
import { DatePipe } from '@angular/common';
import { EmptyComponent } from "../../../shared/empty/empty.component";
import { SlideIn } from "../../../../../shared/directives/slide-in";


@Component({
  selector: 'app-all-orders',
  imports: [DatePipe, EmptyComponent, SlideIn],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent {
  OrdersList = input.required<OrderListItem[]>();

  orderStatusChange = output<{orderId: number, newStatus: 'shipped' | 'completed' | 'canceled'}>();
  selectedOrder = output<number>();
  
  searchTerm = signal<string>('');
  selectedStatus = signal<string>('All');

  filteredOrders = computed<OrderListItem[]>(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const status = this.selectedStatus();
    const orders = this.OrdersList();

    return orders.filter((order) => {
      const customerName = (`${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`).toLowerCase();
      const id = order.id ? order.id.toString() : '';

      const matchesSearch = !term || customerName.includes(term) || id.includes(term);

      const orderStatus = order.orderStatus;
      const matchesRole = status === 'All' || String(orderStatus) === status.toLowerCase();

      return matchesSearch && matchesRole;
    });
  });

  updateSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  updateStatus(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStatus.set(selectElement.value);
  }

  onchangeStatus(orderId: number, newStatus: 'shipped' | 'completed' | 'canceled') {
    this.orderStatusChange.emit({ orderId, newStatus });
  }

  onSelectOrder(orderId: number) {
    this.selectedOrder.emit(orderId);
  }
  
}
