import { RootState } from "../../app/store";
import { createSelector } from '@reduxjs/toolkit';

export const selectUsers = (state: RootState) => state.user.list

export const usersSelector = createSelector(
  selectUsers,
  state => state
)