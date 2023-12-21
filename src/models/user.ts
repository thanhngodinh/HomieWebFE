import { PageFilter } from './common';

export type User = {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  gender?: string;
  phone?: string;
  isVerifiedEmail?: boolean;
  isVerifiedPhone?: boolean;
  isFindRoommate?: boolean;
  dateOfBirth?: string;
  province?: string;
  district?: string[];
  costFrom?: number;
  costTo?: number;
  avatar?: string;
  numPost?: number;
  numLike?: number;
};

export type VerifyPhoneReq = {
  phone: string;
};

export type VerifyOTPReq = {
  otp: string;
};

export type ResetUser = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export interface UserFilter extends PageFilter {
  name?: string;
  province?: string;
  district?: string;
  ward?: string;
  street?: string;
  status?: string;
  costFrom?: number;
  costTo?: number;
  depositFrom?: number;
  depositTo?: number;
  capacity?: number;
}
