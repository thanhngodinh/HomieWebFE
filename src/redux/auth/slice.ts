import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountApi from '../../api/accountApi';
import { Login, Register } from '../../models/auth';
import { setToken } from '../../app/token';
import { CallBackParam, User } from '../../models';

export interface AuthState {
  loading?: boolean;
  profile?: User;
  token: string;
  error?: boolean;
}

type Profile = {
  id: string;
  username: string;
  phone: string;
  email: string;
  isVerifiedEmail: string;
  isFindRoommate: boolean;
  avatar: string;
  gender: string;
  name: string;
};

const initialState: AuthState = {
  loading: false,
  token: '',
  profile: {} as User,
};

export const loginAccount = createAsyncThunk(
  'auth/login',
  async (params: CallBackParam<Login>) => {
    try {
      const response = await accountApi.login({
        username: params.data.username,
        password: params.data.password,
      });
      setToken(response?.data?.token || '');
      params.callback && params.callback(response?.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const registerAccount = createAsyncThunk(
  'auth/register',
  async (params: CallBackParam<Register>) => {
    try {
      const response = await accountApi.register({
        username: params.data.username,
        phone: params.data.phone,
        name: params.data.name,
      });
      params.callback && params.callback();
      return response;
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
      state.token = action.payload?.data?.token;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginAccount.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        console.log(82, action);
        state.token = action.payload?.data?.token || '';
        state.profile = (action.payload?.data?.profile as User) || {};
        state.loading = false;
        state.error = false;
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      // register
      .addCase(registerAccount.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectAuths = (state: any) => state.auth;
export const selectLoadingState = (state: any) => state.loading;
export const selectErrorState = (state: any) => state.error;

export const authAction = authSlice.actions;

export default authSlice.reducer;
