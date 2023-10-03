import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import accountApi from '../../api/accountApi';
import { Account } from '../../models/account';
import { setToken } from '../../app/token';

export interface AuthState {
  loading?: boolean;
  token: string;
  error?: boolean;
}

const initialState: AuthState = {
  loading: false,
  token: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async (account: Account) => {
    try {
      const response = await accountApi.login({
        username: account.username,
        password: account.password,
      });
      setToken(response.token);
      return response.token;
    } catch (error) {
      console.error(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload || '';
        state.loading = false;
        state.error = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectAuths = (state: AuthState) => state;
export const selectLoadingState = (state: AuthState) => state.loading;
export const selectErrorState = (state: AuthState) => state.error;

export const authAction = authSlice.actions;

export default authSlice.reducer;
