import { utilitiesAction } from './../redux/utilities/slice';
import { HostelCreate, HostelFilter, Utilities } from './../models/hostel';
import { BaseResponse } from '../models';
import { Hostel } from '../models/hostel';
import axiosClient from './axiosClient';
import { objectToQueryParams } from '../utils/func';

export const hostelApi = {
  get(query?: HostelFilter): Promise<BaseResponse<Hostel[]>> {
    const queryParams = objectToQueryParams(query)
    const queryString  =  queryParams ? `/search?${queryParams}` : ""
    const url = `/hostels${queryString}`;
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
