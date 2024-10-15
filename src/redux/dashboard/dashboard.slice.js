import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getDashboardAsync } from "./dashboard.async";

const initialState = {
  dashboardLoader: false,
  dashboard: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getDashboardAsync.pending), (state) => {
      state.dashboardLoader = true;
    });
    builder.addMatcher(
      isAnyOf(getDashboardAsync.fulfilled),
      (state, action) => {
        state.dashboardLoader = false;
        state.dashboard = action.payload.data;
      }
    );

    builder.addMatcher(isAnyOf(getDashboardAsync.rejected), (state, action) => {
      state.dashboardLoader = false;
    });
  },
  reducers: {
    emptydashboard: (state) => initialState,
  },
});

export const { emptydashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
