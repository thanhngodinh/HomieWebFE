import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Utilities } from '../../models/hostel';
import { utilitiesApi } from '../../api/hostelApi';

export interface UtilitiesState {
  loading?: boolean;
  listUtilities: Utilities[];
  error?: boolean;
}

const initialState: UtilitiesState = {
  loading: false,
  listUtilities: [],
};

export const getUtilitiess = createAsyncThunk(
  'utilities/getUtilitiess',
  async () => {
    try {
      const response = await utilitiesApi.get({});
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const utilitiesSlice = createSlice({
  name: 'utilities',
  initialState,
  reducers: {
    setUtilities(state, action) {
      state.listUtilities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUtilitiess.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUtilitiess.fulfilled, (state, action) => {
        state.listUtilities = action.payload || [];
        console.log(state.listUtilities);
        state.loading = false;
        state.error = false;
      })
      .addCase(getUtilitiess.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectUtilitiess = (state: any) => state.utilities;
export const selectLoadingState = (state: any) => state.utilities.loading;
export const selectErrorState = (state: any) => state.utilities.error;

export const utilitiesAction = utilitiesSlice.actions;

export const { setUtilities } = utilitiesSlice.actions;

export default utilitiesSlice.reducer;
