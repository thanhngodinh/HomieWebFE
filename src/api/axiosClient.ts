import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import _ from 'lodash';
import { getToken } from '../app/token';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/',
});

// Interceptors
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    const accessToken = getToken();

    if (_.isEmpty(accessToken)) {
      config.headers = {
        'Content-Type': 'application/json',
      };
    } else {
      console.log('Access Token: ', accessToken || 'token is null');
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    // if(response.status === 401) {
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
