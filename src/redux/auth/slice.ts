import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountApi from '../../api/accountApi';
import { Account } from '../../models/account';
import { setToken } from '../../app/token';
import { CallBackParam } from '../../models';

export interface AuthState {
  loading?: boolean;
  token: string;
  error?: boolean;
}

const initialState: AuthState = {
  loading: false,
  token: '',
};

export const loginAccount = createAsyncThunk(
  'auth/login',
  async (params: CallBackParam<Account>) => {
    try {
      const response = await accountApi.login({
        username: params.data.username,
        password: params.data.password,
      });
      setToken(response.token);
      params.callback && params.callback();
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
      .addCase(loginAccount.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.token = action.payload || '';
        state.loading = false;
        state.error = false;
      })
      .addCase(loginAccount.rejected, (state, action) => {
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
