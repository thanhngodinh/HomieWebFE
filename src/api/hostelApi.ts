import { utilitiesAction } from './../redux/utilities/slice';
import {
  Compare,
  CompareRes,
  HostelCreate,
  HostelFilter,
  Utilities,
} from './../models/hostel';
import { BaseResponse } from '../models';
import { Hostel } from '../models/hostel';
import axiosClient from './axiosClient';
import { objectToQueryParams } from '../utils/func';
import { Rate } from '../models/rate';

export const hostelApi = {
  get(): Promise<BaseResponse<Hostel[]>> {
    const url = `/posts`;
    return axiosClient.get(url);
  },
  search({}): Promise<BaseResponse<Hostel[]>> {
    const url = '/posts';
    return axiosClient.get(url);
  },
  searchGet(query?: HostelFilter): Promise<BaseResponse<Hostel[]>> {
    const queryParams = objectToQueryParams(query);
    const queryString = queryParams ? `/search?${queryParams}` : '';
    const url = `/posts${queryString}`;
    return axiosClient.get(url);
  },
  searchPost(params?: HostelFilter): Promise<BaseResponse<Hostel[]>> {
    const url = '/posts/search';
    return axiosClient.post(url, params);
  },
  getSuggest({}): Promise<BaseResponse<Hostel[]>> {
    const url = '/posts/suggest';
    return axiosClient.get(url);
  },
  getById(id: string): Promise<Hostel> {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  getCompare(compare: Compare): Promise<BaseResponse<CompareRes>> {
    const url = `/posts/compare/${compare.post1}/${compare.post2}`;
    return axiosClient.get(url);
  },
  post(params: HostelCreate): Promise<BaseResponse<Hostel>> {
    const url = '/posts';
    return axiosClient.post(url, params);
  },
  patch({}): Promise<BaseResponse<Hostel[]>> {
    const url = '/posts';
    return axiosClient.patch(url);
  },
  likePost(postId: string): Promise<BaseResponse<string>> {
    const url = `posts/like/${postId}`;
    return axiosClient.post(url);
  },
  ratePost(params: Rate): Promise<BaseResponse<string>> {
    const url = `posts/rates`;
    return axiosClient.post(url, params);
  },
};

export const utilitiesApi = {
  get({}): Promise<Utilities[]> {
    const url = '/utilities';
    return axiosClient.get(url);
  },
};
