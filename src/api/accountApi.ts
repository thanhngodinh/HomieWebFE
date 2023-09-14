import { Account, AccountReponse } from '../models/account';
import axiosClient from './axiosClient';

const account = {
  login(params: Account): Promise<AccountReponse> {
    const url = 'auth/login';
    return axiosClient.post(url, {
      username: params.username,
      password: params.password,
    });
  },
};

export default account;
