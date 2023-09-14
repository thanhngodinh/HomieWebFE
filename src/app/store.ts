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
import {userReducer} from '../features/user';
import rootSaga from './rootSaga';
  
  const rootReducer = combineReducers({
    counter: counterReducer,
    student: studentReducer,
    currentUser: accountReducer,
    user: userReducer
  })

  const sagaMiddleware = createSagaMiddleware()
  
  export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
  });
  
  sagaMiddleware.run(rootSaga)
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;

