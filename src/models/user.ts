export type User = {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  gender?: string;
  phone?: string;
  isVerifiedEmail?: boolean;
  isFindRoommate?: boolean;
  dateOfBirth?: string;
  province?: string;
  district?: string[];
  costFrom?: number;
  costTo?: number;
};

export type ResetUser = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export default User;
