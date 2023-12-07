import { utilitiesAction } from './../redux/utilities/slice';
import {
  Compare,
  CompareRes,
  HostelCreate,
  HostelFilter,
  Utilities,
} from './../models/hostel';
import { BaseResponse } from '../models';
import { Post } from '../models/hostel';
import axiosClient from './axiosClient';
import { objectToQueryParams } from '../utils/func';
import { Rate } from '../models/rate';

export const hostelApi = {
  searchGet(query?: HostelFilter): Promise<BaseResponse<Post[]>> {
    const queryParams = objectToQueryParams(query);
    const queryString = queryParams ? `/search?${queryParams}` : '';
    const url = `/posts${queryString}`;
    return axiosClient.get(url);
  },
  searchPost(params?: HostelFilter): Promise<BaseResponse<Post[]>> {
    const url = '/posts/search';
    return axiosClient.post(url, params);
  },
  elasticSearch(params?: HostelFilter): Promise<BaseResponse<Post[]>> {
    const url = '/posts/esearch';
    return axiosClient.post(url, params);
  },
  getSuggest({}): Promise<BaseResponse<Post[]>> {
    const url = '/posts/suggest';
    return axiosClient.get(url);
  },
  getById(id: string): Promise<BaseResponse<Post>> {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  getCompare(compare: Compare): Promise<BaseResponse<CompareRes>> {
    const url = `/posts/compare/${compare.post1}/${compare.post2}`;
    return axiosClient.get(url);
  },
  checkCreatePost(): Promise<BaseResponse<string>> {
    const url = '/posts/check-create';
    return axiosClient.post(url);
  },
  createPost(params: HostelCreate): Promise<BaseResponse<Post>> {
    const url = '/posts';
    return axiosClient.post(url, params);
  },
  updatePost({}): Promise<BaseResponse<Post[]>> {
    const url = '/posts';
    return axiosClient.patch(url);
  },
  likePost(postId: string): Promise<BaseResponse<string>> {
    const url = `/posts/like/${postId}`;
    return axiosClient.post(url);
  },
  ratePost(params: Rate): Promise<BaseResponse<string>> {
    const url = `/rates/${params.postId}`;
    return axiosClient.post(url, params);
  },
};

export const utilitiesApi = {
  get(): Promise<BaseResponse<Utilities[]>> {
    const url = '/utilities';
    return axiosClient.get(url);
  },
};
