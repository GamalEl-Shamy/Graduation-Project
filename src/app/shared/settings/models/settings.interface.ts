export interface UserProfile {
  applicationUserId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  oldPassword?: string | null;
  newPassword?: string | null;
  confirmNewPassword?: string | null;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  oldPassword?: string | null;
  newPassword?: string | null;
  confirmNewPassword?: string | null;
}