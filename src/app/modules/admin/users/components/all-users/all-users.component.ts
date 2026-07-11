import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserItem } from '../../models/user.interface';
import { EmptyComponent } from "../../../shared/empty/empty.component";
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-all-users',
  imports: [FormsModule, EmptyComponent, SlideIn],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent {
  usersList = input.required<UserItem[]>();

  roleChange = output<{userId: string, newRole: string}>();
  toggleLock = output<string>();
  userSelected = output<string>();
  
  searchTerm = signal<string>('');
  selectedRole = signal<string>('All'); 

  
  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const role = this.selectedRole();
    const users = this.usersList();

    return users.filter(user => {
      const fullName = (user.firstName || '').toLowerCase() + (user.lastName || '').toLowerCase();
      const email = (user.email || '').toLowerCase();
      const id = (user.id || '').toLowerCase();

      const matchesSearch = !term || 
        fullName.includes(term) || 
        email.includes(term) || 
        id.includes(term);

      const userRole = (user.role || '').toLowerCase(); 
      const matchesRole = role === 'All' || userRole === role.toLowerCase();

      return matchesSearch && matchesRole;
    });
  });

  updateSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  updateRole(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRole.set(selectElement.value);
  }

  onRoleSelect(userId: string, newRole: string) {
    this.roleChange.emit({ userId, newRole });
  }

  onToggleLock(userId: string) {
    this.toggleLock.emit(userId);
  }

  onSelectUser(userId: string) {
    this.userSelected.emit(userId);
  }
}
