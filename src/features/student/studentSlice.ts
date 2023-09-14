import {
  ListParams,
  ListResponse,
  PaginationParams,
} from '../../models/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../models';
import { RootState } from '../../app/store';

export interface StudentState {
  loading?: boolean;
  list: Student[];
}

const initialState: StudentState = {
  loading: false,
  list: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentList(state) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<Student[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchStudentListFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
  },
});

// Actions
export const studentActions = studentSlice.actions;
export const { fetchStudentList } = studentSlice.actions;

// Selectors
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentList = (state: RootState) => state.student.list;

// Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
