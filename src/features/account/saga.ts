import { PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import accountApi from '../../api/accountApi';
import { Account, AccountReponse } from '../../models/account';
import * as actions from './actions';

function* authen(action: PayloadAction<Account>) {
  try {
    const response: AccountReponse = yield call(
      accountApi.login,
      action.payload
    );
    yield put(actions.loginSuccess(response));
    localStorage.setItem('TokenApp', response.token.accessToken);
  } catch (error: any) {
    yield put(actions.loginFailed(error.message));
  }
}
export default function* userSaga() {
  yield takeLatest(actions.login.type, authen);
}
