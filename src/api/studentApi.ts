import { ListParams, ListResponse, Student } from '../models';
import axiosClient from './axiosClient_test';

const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    const url = '/users';
    return axiosClient.get(url, {
      params,
    });
  },
};

export default studentApi;
