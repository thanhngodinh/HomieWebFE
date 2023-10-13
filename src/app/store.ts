import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { hostelSlice } from '../redux/hostel/slice';
import { authSlice } from '../redux/auth/slice';
import { userSlice } from '../redux/user/slice';
import { utilitiesSlice } from '../redux/utilities/slice';
import { searchSlice } from '../redux/search/slice';

export const storeRedux = configureStore({
  reducer: {
    hostel: hostelSlice.reducer,
    user: userSlice.reducer,
    login: authSlice.reducer,
    utilities: utilitiesSlice.reducer,
    search: searchSlice.reducer,
  },
});
export type AppDispatch = typeof storeRedux.dispatch;
