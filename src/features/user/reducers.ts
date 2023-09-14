import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "../../model/student";
import User from "../../model/user";
import * as action from './actions';

export interface UserState {
    loading?: boolean;
    list: User[];
    error?: boolean;
  }

const initialState: UserState = {
    loading: false,
    list: [],
  };

  export const userReducer = createReducer(initialState, builder => {
    builder
      .addCase(action.fetchUsers, state => {
        state.loading = true;
      })
      .addCase(action.fetchUsersSuccess, (state, action) => {
        state.loading = false;
        state.list = action.payload.data
      })
      .addCase(action.fetchUsersFailed, state => {
        state.loading = false;
        state.error = true;
      });
  });
