import { VerifyOTPReq } from './../models/user';
import { BaseResponse } from './../models/common';
import axiosClient from './axiosClient';
import { Post, User, ResetUser, VerifyPhoneReq } from '../models';

const myApi = {
  getMyProfile(): Promise<BaseResponse<User>> {
    const url = 'my/profile';
    return axiosClient.get(url);
  },

  getMyPost(): Promise<BaseResponse<Post[]>> {
    const url = 'my/posts';
    return axiosClient.get(url);
  },

  getMyLikedPost(): Promise<BaseResponse<Post[]>> {
    const url = 'my/liked-posts';
    return axiosClient.get(url);
  },

  updatePassword(data?: ResetUser): Promise<BaseResponse<User>> {
    const url = 'my/password';
    return axiosClient.patch(url, { ...data });
  },

  updateMyProfile(profile: User): Promise<BaseResponse<User>> {
    const url = 'my/profile';
    return axiosClient.patch(url, profile);
  },

  verifyPhone(data: VerifyPhoneReq): Promise<BaseResponse<string>> {
    const url = 'my/verify-phone';
    return axiosClient.patch(url, data);
  },

  verifyPhoneOTP(data: VerifyOTPReq): Promise<BaseResponse<string>> {
    const url = 'my/verify-otp';
    return axiosClient.patch(url, data);
  },
};

export default myApi;
