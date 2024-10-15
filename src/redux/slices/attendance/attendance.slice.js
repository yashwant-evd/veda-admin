import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { staffAttendanceListAsync } from "./attendance.async";

const initialState = {
  attendanceLoader: false,
  getAttendance: [],
};

export const employeeAttendanceSlice = createSlice({
  name: "attendance",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(staffAttendanceListAsync.pending), (state) => {
      state.attendanceLoader = true;
    });

    builder.addMatcher(
      isAnyOf(staffAttendanceListAsync.fulfilled),
      (state, action) => {
        state.attendanceLoader = false;
        state.getAttendance = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(staffAttendanceListAsync.rejected),
      (state, action) => {
        state.attendanceLoader = false;
      }
    );
  },
  reducers: {
    emptyassignment: (state) => initialState,
  },
});

export const { attendance } = employeeAttendanceSlice.actions;

export default employeeAttendanceSlice.reducer;
