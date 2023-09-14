import { PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import userApi from '../../api/userApi';
import { BaseResponse, ListParams } from '../../models';
import User from '../../models/user';
import * as studentActions from './actions';

function* fetchUserList(action: PayloadAction<ListParams>) {
  try {
    const response: BaseResponse<User[]> = yield call(
      userApi.getAll,
      action.payload
    );
    yield put(studentActions.fetchUsersSuccess(response));
  } catch (error: any) {
    yield put(studentActions.fetchUsersFailed(error.message));
  }
}
export default function* userSaga() {
  yield takeLatest(studentActions.fetchUsers.type, fetchUserList);
}
