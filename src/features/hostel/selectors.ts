import { RootState } from "../../app/store";
import { createSelector } from '@reduxjs/toolkit';

export const selectHostels = (state: RootState) => state.hostel.list

export const hostelsSelector = createSelector(
  selectHostels,
  state => state
)