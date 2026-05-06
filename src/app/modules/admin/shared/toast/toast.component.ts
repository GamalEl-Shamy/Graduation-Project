import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  successMessage = input<string>('');
  errorMessage = input<string>('');

  isClose = model<boolean>(false);

  close() {
    this.isClose.set(true);
  }
}
