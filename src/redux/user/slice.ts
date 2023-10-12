import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountApi from '../../api/accountApi';
import { Account } from '../../models/account';
import { setToken } from '../../app/token';
import { CallBackParam, User } from '../../models';
import { hostelApi } from '../../api/hostelApi';
import myApi from '../../api/myApi';

export interface UserState {
  loading?: boolean;
  profile?: User;
  error?: boolean;
}

const initialState: UserState = {
  loading: false,
};

export const getMyProfile = createAsyncThunk('user/getMyProfile', async () => {
  try {
    const response = await myApi.getMyProfile();
    return response;
  } catch (error) {
    console.error(error);
  }
});
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.profile = action.payload?.data;
        state.loading = false;
        state.error = false;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectUsers = (state: any) => state.user;
export const selectLoadingState = (state: any) => state.user.loading;
export const selectErrorState = (state: any) => state.user.error;

export const userAction = userSlice.actions;

export default userSlice.reducer;
