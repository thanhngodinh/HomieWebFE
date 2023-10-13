import { BaseResponse } from './../models/common';
import axiosClient from './axiosClient';
import { User } from '../models';

const myApi = {
  getMyProfile(): Promise<BaseResponse<User>> {
    const url = 'my/profile';
    return axiosClient.get(url);
  },
};

export default myApi;
