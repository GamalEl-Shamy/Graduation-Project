import { Component } from '@angular/core';
import { AllUsersComponent } from "../../components/all-users/all-users.component";

@Component({
  selector: 'app-users',
  imports: [AllUsersComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {

}
