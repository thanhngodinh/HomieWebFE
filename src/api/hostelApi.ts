import { utilitiesAction } from './../redux/utilities/slice';
import { HostelCreate, Utilities } from './../models/hostel';
import { BaseResponse } from '../models';
import { Hostel } from '../models/hostel';
import axiosClient from './axiosClient';

export const hostelApi = {
  get({}): Promise<BaseResponse<Hostel[]>> {
    const url = '/hostels';
    return axiosClient.get(url);
  },
  search({}): Promise<BaseResponse<Hostel[]>> {
    const url = '/hostels';
    return axiosClient.get(url);
  },
  getSuggest({}): Promise<BaseResponse<Hostel[]>> {
    const url = '/hostels/suggest';
    return axiosClient.get(url);
  },
  getById(id: string): Promise<Hostel> {
    const url = `/hostels/${id}`;
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

export const utilitiesApi = {
  get({}): Promise<Utilities[]> {
    const url = '/utilities';
    return axiosClient.get(url);
  },
};
