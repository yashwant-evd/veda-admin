import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAllStudentsByBatchAsync,
  getAllTestReportsByBatchAsync,
  getTestReportsByUserIdAsync,
  getAllEmployeeByBatchIdAsync,
} from "./batchDetails.async";

const initialState = {
  batchDetailLoader: false,
  batchDetailData: [],
  batchEmployeeLoader: false,
  batchEmployeeData: [],
  getAllTetstReportLoader: false,
  getAllTetstReportData: [],
  getTetstReportByIdLoader: false,
  getTetstReportByIdData: [],
};

export const batchDetailSlice = createSlice({
  name: "batchDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(getAllEmployeeByBatchIdAsync.pending),
      (state) => {
        state.batchEmployeeLoader = true;
      }
    );

    builder.addMatcher(
      isAnyOf(getAllEmployeeByBatchIdAsync.fulfilled),
      (state, action) => {
        state.batchEmployeeLoader = false;
        state.batchEmployeeData = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(getAllEmployeeByBatchIdAsync.rejected),
      (state, action) => {
        state.batchEmployeeLoader = false;
      }
    );

    builder.addMatcher(isAnyOf(getAllStudentsByBatchAsync.pending), (state) => {
      state.batchDetailLoader = true;
    });

    builder.addMatcher(
      isAnyOf(getAllStudentsByBatchAsync.fulfilled),
      (state, action) => {
        state.batchDetailLoader = false;
        state.batchDetailData = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(getAllStudentsByBatchAsync.rejected),
      (state, action) => {
        state.batchDetailLoader = false;
      }
    );

    builder.addMatcher(
      isAnyOf(getAllTestReportsByBatchAsync.pending),
      (state) => {
        state.getAllTetstReportLoader = true;
      }
    );

    builder.addMatcher(
      isAnyOf(getAllTestReportsByBatchAsync.fulfilled),
      (state, action) => {
        state.getAllTetstReportLoader = false;
        state.getAllTetstReportData = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(getAllTestReportsByBatchAsync.rejected),
      (state, action) => {
        state.getAllTetstReportLoader = false;
      }
    );

    builder.addMatcher(
      isAnyOf(getTestReportsByUserIdAsync.pending),
      (state) => {
        state.getTetstReportByIdLoader = true;
      }
    );

    builder.addMatcher(
      isAnyOf(getTestReportsByUserIdAsync.fulfilled),
      (state, action) => {
        state.getTetstReportByIdLoader = false;
        state.getTetstReportByIdData = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(getTestReportsByUserIdAsync.rejected),
      (state, action) => {
        state.getTetstReportByIdLoader = false;
      }
    );
  },
  reducers: {
    emptyBatchDetails: (state) => initialState,
  },
});

export const { emptyPoll } = batchDetailSlice.actions;

export default batchDetailSlice.reducer;
