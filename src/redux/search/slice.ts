import { createSlice } from '@reduxjs/toolkit';

export interface Search<T> {
    query: string
    results: T
}

const initialState: Search<any> = {
    query: '',
    results: {},
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
    updateResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const selectSearchQuery = (state: any) => state.search.query;
export const selectSearchResults = (state: any) => state.search.results;

export const { updateQuery, updateResults } = searchSlice.actions;

export default searchSlice.reducer;