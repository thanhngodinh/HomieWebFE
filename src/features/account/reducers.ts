import { createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../models/student';
import User from '../../models/user';
import * as action from './actions';

interface CurrentUser {
  currentUser: User;
  loading: boolean;
  error: string;
}
const initState: CurrentUser = {
  currentUser: {
    birthDay: '',
    email: '',
    firstName: '',
    gender: '',
    id: '',
    isEmailVerified: false,
    lastName: '',
    phoneName: '',
    userName: '',
    userStatus: '',
    middleName: '',
  },
  error: '',
  loading: false,
};

export const accountReducer = createReducer(initState, (builder) => {
  builder
    .addCase(action.login, (state) => {})
    .addCase(action.loginSuccess, (state, action) => {
      state.currentUser = action.payload.profile;
    })
    .addCase(action.loginFailed, (state) => {
      state.loading = false;
      state.error = '';
    });
});
