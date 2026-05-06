export interface OrderResponse {
  totalOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  canceledOrders: number;
  data: OrderListItem[];
}

export interface OrderListItem {
  id: number;
  dateTime: string;
  totalPrice: number;
  orderStatus: string; 
  paymentMethod: string;
  totalItemsCount: number;
  productNames: string[];
  customer: OrderCustomer;
  carrier: string | null;
  transactionId: string | null;
}

export interface OrderCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
}

export interface OrderDetail {
  id: number;
  applicationUserId: string;
  applicationUser: ApplicationUserDetail;
  dateTime: string;
  orderStatus: number;
  paymentMethod: number; 
  totalPrice: number;
  carrier: string | null;
  carrierId: string | null;
  transactionId: string | null;
  sessionId: string | null;
  orderItems: any; 
}

export interface ApplicationUserDetail {
  firstName: string;
  lastName: string;
  address: string | null;
  email: string;
  phoneNumber: string | null;
  userName: string;
}