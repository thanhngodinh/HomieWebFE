import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseResponse, CallBackParam, Hostel, ResetUser, User } from '../../models';
import myApi from '../../api/myApi';
import userApi from '../../api/userApi';

export interface UserState {
  loading?: boolean;
  profile?: User;
  error?: boolean;
  roommates?: User;
  posts?: Hostel[];
  status?: string;
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

export const updateMyProfile = createAsyncThunk(
  'user/updateMyProfile',
  async (profile: User) => {
    try {
      const response = await myApi.updateMyProfile(profile);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getMyPosts = createAsyncThunk('user/getMyPosts', async () => {
  try {
    const response = await myApi.getMyPost();
    return response;
  } catch (error) {
    console.error(error);
  }
});

export const searchRoommates = createAsyncThunk(
  'user/searchRoommates',
  async () => {
    try {
      const response = await userApi.searchRoommates({});
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (data?: ResetUser) => {
    try {
      const response = await myApi.updatePassword(data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

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
      // getMyProfile
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
      })
      // updateMyProfile
      .addCase(updateMyProfile.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(updateMyProfile.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      // myPosts
      .addCase(getMyPosts.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.posts = action.payload?.data;
        state.loading = false;
        state.error = false;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      // searchRoommate
      .addCase(searchRoommates.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchRoommates.fulfilled, (state, action) => {
        state.roommates = action.payload?.data;
        state.loading = false;
        state.error = false;
      })
      .addCase(searchRoommates.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      // updatePassword
      .addCase(updatePassword.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = action.payload?.status;
        state.loading = false;
        state.error = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectUsers = (state: any) => state.user;
export const selectLoadingState = (state: any) => state.user.loading;
export const selectErrorState = (state: any) => state.user.error;
export const selectStatusState = (state: any) => state.user.status;

export const userAction = userSlice.actions;

export default userSlice.reducer;
