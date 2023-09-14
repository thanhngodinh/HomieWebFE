import { createAction } from '@reduxjs/toolkit';
import { BaseResponse } from '../../models';
import User from '../../models/user';

export const fetchUsers = createAction('user/fetchUserList');
export const fetchUsersSuccess = createAction<BaseResponse<User[]>>(
  'user/fetchUserListSuccess'
);
export const fetchUsersFailed = createAction<string>(
  'user/fetchUserListFailed'
);
