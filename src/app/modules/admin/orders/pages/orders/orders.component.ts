import { Component, inject, signal } from '@angular/core';
import { EmptyComponent } from "../../../shared/empty/empty.component";
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { SkeletonAdminComponent } from "../../../shared/skeleton-admin/skeleton-admin.component";
import { ToastComponent } from "../../../shared/toast/toast.component";
import { AllOrdersComponent } from "../../components/all-orders/all-orders.component";
import { OrdersHeaderComponent } from "../../components/orders-header/orders-header.component";
import { OrdersOverviewComponent } from "../../components/orders-overview/orders-overview.component";
import { OrderDetail, OrderListItem, OrderResponse } from '../../models/order.interface';
import { OrdersService } from '../../services/orders.service';
import { AmbientBackgroundComponent } from "../../../shared/ambient-background/ambient-background.component";

@Component({
  selector: 'app-orders',
  imports: [LoadingComponent, ToastComponent, SkeletonAdminComponent, OrdersHeaderComponent, OrdersOverviewComponent, AllOrdersComponent, EmptyComponent, AmbientBackgroundComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
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
}
