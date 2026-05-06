export interface UserResponse {
  totalCount: number;
  activeCount: number;
  blockedCount: number;
  adminCount: number;
  data: UserItem[];
}

export interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string | null;
  address: string | null;
  role: string;
}

export interface UpdateRoleRequest {
  roleName: string;
}