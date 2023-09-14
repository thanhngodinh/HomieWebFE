import { BaseResponse, ListParams } from "../model";
import User from "../model/user";
import axiosClient from "./axiosClient";

const userApi = {
  getAll({}): Promise<BaseResponse<User[]>> {
    const url = '/users/all';
    return axiosClient.get(url);
  },
};

export default userApi;