import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Hostel } from '../../models/hostel';
import axiosClient from '../../api/axiosClient';
import hostelApi from '../../api/hostelApi';

export interface HostelState {
  loading?: boolean;
  list: Hostel[];
  total: number;
  error?: boolean;
}

const initialState: HostelState = {
  loading: false,
  list: [],
  total: 0,
};

export const getHostels = createAsyncThunk('hostel/getHostels', async () => {
  try {
    const response = await hostelApi.get({});
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
});

export const hostelSlice = createSlice({
  name: 'hostel',
  initialState,
  reducers: {
    setHostel(state, action) {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHostels.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getHostels.fulfilled, (state, action) => {
        state.list = action.payload?.data || [];
        state.total = action.payload?.total || 0;
        console.log(state.list);
        state.loading = false;
        state.error = false;
      })
      .addCase(getHostels.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectHostels = (state: HostelState) => state;
export const selectLoadingState = (state: HostelState) => state.loading;
export const selectErrorState = (state: HostelState) => state.error;

export const hostelAction = hostelSlice.actions;

export const { setHostel } = hostelSlice.actions;

export default hostelSlice.reducer;
