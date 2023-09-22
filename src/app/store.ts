import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { accountReducer } from '../features/account';
import counterReducer from '../features/counter/counterSlice';
import studentReducer from '../features/student/studentSlice';
import { userReducer } from '../features/user';
import { hostelReducer } from '../features/hostel';
import rootSaga from './rootSaga';
import { hostelSlice } from '../redux/hostel/slice';
import { authSlice } from '../redux/auth/slice';

const rootReducer = combineReducers({
  counter: counterReducer,
  student: studentReducer,
  currentUser: accountReducer,
  hostel: hostelReducer,
  user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const storeRedux = configureStore({
  reducer: {
    hostel: hostelSlice.reducer,
    login: authSlice.reducer,
  },
});
