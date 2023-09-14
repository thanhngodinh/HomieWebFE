import { Account, AccountReponse } from "../model/account";
import axiosClient from "./axiosClient";

const account = {
  login(params: Account): Promise<AccountReponse> {
    const url = '/Account/login';
    return axiosClient.post(url, {
        userName : params.userName,
        password: params.password
    });
  },
};

export default account;