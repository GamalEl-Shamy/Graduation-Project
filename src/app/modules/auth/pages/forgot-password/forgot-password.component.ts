import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WelcomeMessageComponent } from "../../../user/components/welcome-message/welcome-message.component";

@Component({
  selector: 'app-forgot-password',
  imports: [WelcomeMessageComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
}
