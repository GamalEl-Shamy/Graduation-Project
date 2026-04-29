import { Component, effect, input, output, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register-success',
  imports: [RouterLink],
  templateUrl: './register-success.component.html',
  styleUrl: './register-success.component.css',
})
export class RegisterSuccessComponent {
  message = input<string>('Account created! Please check your email to confirm your account.');
  isVisible = input<boolean>(false);

}
