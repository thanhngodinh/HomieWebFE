import { BaseResponse } from './../models/common';
import axiosClient from './axiosClient';
import { Hostel, User } from '../models';

const myApi = {
  getMyProfile(): Promise<BaseResponse<User>> {
    const url = 'my/profile';
    return axiosClient.get(url);
  },
  getMyPost(): Promise<BaseResponse<Hostel[]>> {
    const url = 'my/posts';
    return axiosClient.get(url);
  },
};

export default myApi;
