import { Component, computed, input } from '@angular/core';
import { UserResponse } from '../../models/user.interface';

@Component({
  selector: 'app-users-overview',
  imports: [],
  templateUrl: './users-overview.component.html',
  styleUrl: './users-overview.component.css',
})
export class UsersOverviewComponent {
  usersInformation = input.required<UserResponse>();

  activePercentage = computed(() => {
    const info = this.usersInformation();
    const total = info?.totalCount ?? 0;
    const active = info?.activeCount ?? 0;

    return total === 0 ? 0 : (active / total) * 100;
  });

  adminPercentage = computed(() => {
    const info = this.usersInformation();
    const total = info?.totalCount ?? 0;
    const admin = info?.adminCount ?? 0;

    return total === 0 ? 0 : (admin / total) * 100;
  });

  blockedPercentage = computed(() => {
    const info = this.usersInformation();
    const total = info?.totalCount ?? 0;
    const blocked = info?.blockedCount ?? 0;

    return total === 0 ? 0 : (blocked / total) * 100;
  });
}
