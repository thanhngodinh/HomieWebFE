import { createReducer } from '@reduxjs/toolkit';
import { Hostel } from '../../models/hostel';
import * as action from './actions';
import { actionTypes } from './actions';

export interface HostelState {
  loading?: boolean;
  list: Hostel[];
  error?: boolean;
}

const initialState: HostelState = {
  loading: false,
  list: [],
};

// export const hostelReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(action.fetchHostels, (state) => {
//       state.loading = true;
//     })
//     .addCase(action.fetchHostelsSuccess, (state, action) => {
//       state.loading = false;
//       state.list = action.payload.data;
//     })
//     .addCase(action.fetchHostelsFailed, (state) => {
//       state.loading = false;
//       state.error = true;
//     });
// });

export const hostelReducer = (state: HostelState, action: any) => {
  switch (action.type) {
    case actionTypes.LOADING: {
      return {...state, loading: true}
    }
    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.data
      }
      default:
        return initialState;
  }
}
