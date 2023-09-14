import { BaseResponse, PaginationReponse } from '../models';
import { Hostel } from '../models/hostel';
import axiosClient from './axiosClient';

const hostelApi = {
  get({}): Promise<BaseResponse<Hostel[]>> {
    const url = '/hostels';
    return axiosClient.get(url);
  },
  search({}): Promise<BaseResponse<Hostel[]>> {
    const url = '/hostels';
    return axiosClient.get(url);
  },
  getById({}): Promise<BaseResponse<Hostel>> {
    const url = '/hostels/{id}';
    return axiosClient.get(url);
  },
  post({}): Promise<BaseResponse<Hostel[]>> {
    const url = '/hostels';
    return axiosClient.post(url);
  },
  put({}): Promise<BaseResponse<Hostel[]>> {
    const url = '/hostels';
    return axiosClient.put(url);
  },
};

export default hostelApi;
