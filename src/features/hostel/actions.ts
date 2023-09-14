import { createAction } from '@reduxjs/toolkit';
import { BaseResponse, PaginationReponse } from '../../models';
import { Hostel } from '../../models/hostel';

export const fetchHostels = createAction('hostel/fetchHostelList');
export const fetchHostelsSuccess = createAction<PaginationReponse<Hostel[]>>(
  'hostel/fetchHostelListSuccess'
);
export const fetchHostelsFailed = createAction<string>(
  'hostel/fetchHostelListFailed'
);

export const fetch = () => {
  return {type: fetchHostels().type}
}

export const actionTypes = {
  FAILURE: 'FAILURE',
  RESET: 'RESET',
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  HYDRATE: 'HYDRATE',
  LOADING: 'LOADING',
  LOAD: 'LOAD'
}
