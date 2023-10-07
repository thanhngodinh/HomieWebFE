import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Hostel, HostelCreate } from '../../models/hostel';
import { hostelApi } from '../../api/hostelApi';

export interface HostelState {
  loading?: boolean;
  list: Hostel[];
  listSuggest?: Hostel[];
  totalSuggest?: number;
  total: number;
  hostel?: Hostel;
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

export const getHostelSuggest = createAsyncThunk(
  'hostel/getHostelSuggest',
  async () => {
    try {
      const response = await hostelApi.getSuggest({});
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getHostelById = createAsyncThunk(
  'hostel/getHostelById',
  async (id: string) => {
    try {
      const response = await hostelApi.getById(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

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
      // get
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
      // suggest
      .addCase(getHostelSuggest.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getHostelSuggest.fulfilled, (state, action) => {
        state.listSuggest = action.payload?.data || [];
        state.totalSuggest = action.payload?.total || 0;
        state.loading = false;
        state.error = false;
      })
      .addCase(getHostelSuggest.rejected, (state, action) => {
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
      })
      //getHostelById
      .addCase(getHostelById.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getHostelById.fulfilled, (state, action) => {
        state.hostel = action.payload || undefined;
        console.log(state.hostel);
        state.loading = false;
        state.error = false;
      })
      .addCase(getHostelById.rejected, (state, action) => {
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
