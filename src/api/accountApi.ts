import { BaseResponse } from '../models';
import { Login, LoginRes, Register } from '../models/auth';
import axiosClient from './axiosClient';

const account = {
  login(param: Login): Promise<BaseResponse<LoginRes>> {
    const url = 'auth/login';
    return axiosClient.post(url, {
      username: param.username,
      password: param.password,
    });
  },

  register(param: Register): Promise<BaseResponse<string>> {
    const url = 'auth/register';
    return axiosClient.post(url, {
      username: param.username,
      phone: param.phone,
      name: param.name,
    });
  },
};

export default account;
