import { HostelCreate } from './../models/hostel';
import { BaseResponse } from '../models';
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
  post(params: HostelCreate): Promise<BaseResponse<Hostel>> {
    const url = '/hostels';
    return axiosClient.post(url, params);
  },
  put({}): Promise<BaseResponse<Hostel[]>> {
    const url = '/hostels';
    return axiosClient.put(url);
  },
};

export default hostelApi;
