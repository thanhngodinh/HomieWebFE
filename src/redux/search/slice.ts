import { createSlice } from '@reduxjs/toolkit';

export interface Search<T> {
    query: string
    results: T
    resultsMap: T
}

const initialState: Search<any> = {
    query: '',
    results: {},
    resultsMap: {}
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
    updateResultsMap: (state, action) => {
      state.resultsMap = action.payload;
    },
  },
});

export const selectSearchQuery = (state: any) => state.search.query;
export const selectSearchResults = (state: any) => state.search.results;
export const selectSearchResultsMap = (state: any) => state.search.resultsMap;


export const { updateQuery, updateResults, updateResultsMap } = searchSlice.actions;

export default searchSlice.reducer;