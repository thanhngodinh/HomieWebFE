import { createAction } from "@reduxjs/toolkit"
import { BaseResponse } from "../../model"
import User from "../../model/user"

export  const fetchUsers = createAction('user/fetchUserList')
export const fetchUsersSuccess = createAction<BaseResponse<User[]>>('user/fetchUserListSuccess')
export const fetchUsersFailed = createAction<string>('user/fetchUserListFailed')

