import { BaseResponse } from '../models/common';
import axiosClient from './axiosClient';
import { User } from '../models';

const userApi = {
  searchRoommates(params: any): Promise<BaseResponse<User>> {
    const url = 'roommates/search';
    return axiosClient.post(url, { ...params });
  },

  getUserById(id?: string): Promise<BaseResponse<User>> {
    const url = `users/${id}`;
    return axiosClient.get(url);
  },
};

export default userApi;
