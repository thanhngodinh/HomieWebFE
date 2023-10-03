import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { hostelSlice } from '../redux/hostel/slice';
import { authSlice } from '../redux/auth/slice';

export const storeRedux = configureStore({
  reducer: {
    hostel: hostelSlice.reducer,
    login: authSlice.reducer,
  },
});
export type AppDispatch = typeof storeRedux.dispatch;
