import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import hostelApi from '../../api/hostelApi';
import { BaseResponse, ListParams, PaginationReponse } from '../../models';
import { Hostel } from '../../models/hostel';
import * as hostelsActions from './actions';
import axiosClient from '../../api/axiosClient';
import { actionTypes } from './actions';

function* fetchHostelList(action: PayloadAction<ListParams>) {
  try {
    yield put({ type: actionTypes.LOAD });
    const response = yield hostelApi.get({});
    console.log(response);
    yield put({ type: actionTypes.LOAD_DATA_SUCCESS, payload: response.data });
  } catch (error: any) {
    yield put(hostelsActions.fetchHostelsFailed(error.message));
  }
}
export default function* hostelSaga() {
  yield takeLatest(actionTypes.LOAD, fetchHostelList);
}
