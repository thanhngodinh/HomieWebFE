import { BaseResponse, ListParams } from '../models';
import User from '../models/user';
import axiosClient from './axiosClient';

const userApi = {
  getAll({}): Promise<BaseResponse<User[]>> {
    const url = '/users/all';
    return axiosClient.get(url);
  },
};

export default userApi;
