import { BaseResponse } from '../models/common';
import axiosClient from './axiosClient';
import { User } from '../models';

const userApi = {
  searchRoommates(params: any): Promise<BaseResponse<User>> {
    const url = 'roommates/search';
    return axiosClient.post(url, { ...params });
  },
};

export default userApi;
