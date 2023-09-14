import { all } from 'redux-saga/effects';
import studentSaga from '../features/student/studentSaga';
import userSaga from '../features/user/saga';
import hostelSaga from '../features/hostel/saga';
import authen from '../features/account/saga';

export default function* rootSaga() {
  yield all([studentSaga(), userSaga(), authen(), hostelSaga()]);
}
