import { BaseResponse } from './../models/common';
import axiosClient from './axiosClient';
import { Post, User, ResetUser } from '../models';

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
};

export default myApi;
