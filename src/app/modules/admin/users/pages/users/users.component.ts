import { Component, inject, signal } from '@angular/core';
import { AllUsersComponent } from "../../components/all-users/all-users.component";
import { UserItem, UserResponse } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { SkeletonAdminComponent } from "../../../shared/skeleton-admin/skeleton-admin.component";
import { ToastComponent } from "../../../shared/toast/toast.component";
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { UsersOverviewComponent } from "../../components/users-overview/users-overview.component";
import { UsersHeaderComponent } from "../../components/users-header/users-header.component";
import { UserDetailsComponent } from "../../components/user-details/user-details.component";
import { AmbientBackgroundComponent } from "../../../shared/ambient-background/ambient-background.component";
import { EmptyComponent } from "../../../shared/empty/empty.component";

@Component({
  selector: 'app-users',
  imports: [AllUsersComponent, SkeletonAdminComponent, ToastComponent, LoadingComponent, UsersOverviewComponent, UsersHeaderComponent, UserDetailsComponent, AmbientBackgroundComponent, EmptyComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  private usersService = inject(UserService);

  usersInfo = signal<UserResponse | null>(null);
  usersList = signal<UserItem[]>([]);

  isLoading = signal<boolean>(false);
  isProcessing = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  selectedUser = signal<UserItem | null>(null);
  isRoleModalOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isProcessing.set(true);
    this.errorMessage.set(null);

    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        this.usersInfo.set(response);
        this.usersList.set(response.data);
        this.isProcessing.set(false);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.isProcessing.set(false);
      },
    });
  }

  handleUserSelection(userId: string) {
    const clickedUser = this.usersList().find(user => user.id === userId);

    if (clickedUser) {
      this.selectedUser.set(clickedUser);
    }
  }

  toggleLockUnlock(userId: string) {
    const isConfirmed = confirm('Are you sure you want to change the lock status for this user?');

    if (isConfirmed) {
      this.isLoading.set(true);
      
      this.usersService.toggleLockStatus(userId).subscribe({
        next: () => {
          this.showSuccessMessage('User lock status updated successfully.');
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error toggling lock status', err);
          this.showErrorMessage('Failed to update user lock status.');
          this.isLoading.set(false);
        }
      });
    }
  }

  changeRole(userId:string, newRole: string) {
    this.isLoading.set(true);

    this.usersService.updateUserRole(userId, { roleName: newRole }).subscribe({
      next: () => {
        this.showSuccessMessage(`Role updated to ${newRole} successfully.`);
        this.loadUsers(); 
      },
      error: (err) => {
        console.error('Error updating role', err);
        this.showErrorMessage('Failed to update user role. Please try again later.');
        this.isLoading.set(false);
      }
    });
  }

  private showSuccessMessage(msg: string) {
    this.successMessage.set(msg);
    this.errorMessage.set(null);
    this.isProcessing.set(false);
    this.isLoading.set(false);
    setTimeout(() => {
      this.successMessage.set(null);
    }, 3000);
  }

  private showErrorMessage(msg: string) {
    this.errorMessage.set(msg);
    this.successMessage.set(null);
    this.isProcessing.set(false);
    this.isLoading.set(false);
    setTimeout(() => {
      this.errorMessage.set(null);
    }, 3000);
  }

}
