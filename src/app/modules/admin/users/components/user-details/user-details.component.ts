import { Component, input, output } from '@angular/core';
import { UserItem } from '../../models/user.interface';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  userInformation = input.required<UserItem>();

  closeModal = output<void>();
  toggleLock = output<string>();

  onClose() {
    this.closeModal.emit();
  }

  onToggleLock(userId: string) {
    this.toggleLock.emit(userId);
  }
}
