import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { OrderDetail, OrderListItem, OrderResponse } from '../../models/order.interface';
import { OrdersService } from '../../services/orders.service';
import { SkeletonAdminComponent } from "../../../shared/skeleton-admin/skeleton-admin.component";
import { EmptyOrderComponent } from "../empty-order/empty-order.component";

@Component({
  selector: 'app-all-orders',
  imports: [DatePipe, ToastComponent, LoadingComponent, SkeletonAdminComponent, EmptyOrderComponent],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent {
  private ordersService = inject(OrdersService);

  ordersInfo = signal<OrderResponse | null>(null);
  ordersList = signal<OrderListItem[]>([]);

  isLoading = signal<boolean>(true);
  isProcessing = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  selectedOrderDetails = signal<OrderDetail | null>(null);
  isDetailsModalOpen = signal<boolean>(false);
  isLoadingDetails = signal<boolean>(false);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.ordersService.getAllOrders().subscribe({
      next: (response) => {
        this.ordersInfo.set(response);
        this.ordersList.set(response.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.isLoading.set(false);
      },
    });
  }

  viewOrderDetails(id: number): void {
    this.isDetailsModalOpen.set(true);
    this.isLoadingDetails.set(true);
    this.selectedOrderDetails.set(null);

    this.ordersService.getOrderById(id).subscribe({
      next: (details) => {
        this.selectedOrderDetails.set(details);
        this.isLoadingDetails.set(false);
      },
      error: (err) => {
        console.error('Error fetching order details:', err);
        this.errorMessage.set('Failed to load order details.');
        this.isLoadingDetails.set(false);
        this.isDetailsModalOpen.set(false);
        setTimeout(() => this.errorMessage.set(null), 3000);
      },
    });
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen.set(false);
    this.selectedOrderDetails.set(null);
  }

  changeOrderStatus(id: number, status: 'shipped' | 'completed' | 'canceled'): void {
    const actionText =
      status === 'shipped' ? 'ship' : status === 'completed' ? 'complete' : 'cancel';
    const isConfirmed = confirm(`Are you sure you want to ${actionText} this order?`);

    if (!isConfirmed) return;

    this.isProcessing.set(true);

    let request;
    switch (status) {
      case 'shipped':
        request = this.ordersService.markAsShipped(id);
        break;
      case 'completed':
        request = this.ordersService.markAsCompleted(id);
        break;
      case 'canceled':
        request = this.ordersService.markAsCanceled(id);
        break;
    }

    request.subscribe({
      next: () => {
        this.showSuccessMessage(`Order marked as ${status} successfully.`);
        this.loadOrders();
      },
      error: (err) => {
        console.error(`Error marking order as ${status}:`, err);
        this.errorMessage.set(`Failed to mark order as ${status}.`);
        this.isProcessing.set(false);
        setTimeout(() => this.errorMessage.set(null), 3000);
      },
    });
  }

  private showSuccessMessage(msg: string) {
    this.successMessage.set(msg);
    this.isProcessing.set(false);
    setTimeout(() => {
      this.successMessage.set(null);
    }, 3000);
  }

  get shippedOrdersPercentage(): number {
    const total = this.ordersInfo()?.totalOrders ?? 0;
    const active = this.ordersInfo()?.shippedOrders ?? 0;

    if (total === 0) return 0;

    return (active / total) * 100;
  }

  get pendingOrdersPercentage(): number {
    const total = this.ordersInfo()?.totalOrders ?? 0;
    const active = this.ordersInfo()?.pendingOrders ?? 0;

    if (total === 0) return 0;

    return (active / total) * 100;
  }

  get canceledOrdersPercentage(): number {
    const total = this.ordersInfo()?.totalOrders ?? 0;
    const active = this.ordersInfo()?.canceledOrders ?? 0;

    if (total === 0) return 0;

    return (active / total) * 100;
  }
}
