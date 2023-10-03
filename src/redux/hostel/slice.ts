import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Hostel, HostelCreate } from '../../models/hostel';
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
    return response;
  } catch (error) {
    console.error(error);
  }
});

export const createHostel = createAsyncThunk(
  'hostel/createHostel',
  async (hostel: HostelCreate) => {
    try {
      const response = await hostelApi.post(hostel);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

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
      })
      // create
      .addCase(createHostel.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createHostel.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(createHostel.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectHostels = (state: any) => state.hostel;
export const selectLoadingState = (state: any) => state.hostel.loading;
export const selectErrorState = (state: any) => state.hostel.error;

export const hostelAction = hostelSlice.actions;

export const { setHostel } = hostelSlice.actions;

export default hostelSlice.reducer;
