import { Component } from '@angular/core';
import { AllOrdersComponent } from "../../components/all-orders/all-orders.component";

@Component({
  selector: 'app-orders',
  imports: [AllOrdersComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {

}
