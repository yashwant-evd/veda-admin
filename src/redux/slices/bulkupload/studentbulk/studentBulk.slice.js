import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  UploadBulkAsync,
  getAllBulkFiles,
  assignBatchToEmployeeAsync,
} from "./studentBulk.Async";

const initialState = {
  bulkLoader: false,
  bulkUpload: [],
  bulkFiles: [],
  bulkBatchLoader: false,
  bulkBatchUpload: [],
};

export const studentBulkSlice = createSlice({
  name: "studentBulk",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(assignBatchToEmployeeAsync.pending), (state) => {
      state.bulkBatchLoader = true;
    });
    builder.addMatcher(
      isAnyOf(assignBatchToEmployeeAsync.fulfilled),
      (state, action) => {
        state.bulkBatchLoader = false;
        state.bulkBatchUpload = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(assignBatchToEmployeeAsync.rejected),
      (state, action) => {
        state.bulkBatchLoader = false;
      }
    );

    builder.addMatcher(
      isAnyOf(UploadBulkAsync.pending, getAllBulkFiles.pending),
      (state) => {
        state.bulkLoader = true;
      }
    );

    builder.addMatcher(isAnyOf(UploadBulkAsync.fulfilled), (state, action) => {
      state.bulkLoader = false;
      state.bulkUpload = action.payload;
    });
    builder.addMatcher(isAnyOf(getAllBulkFiles.fulfilled), (state, action) => {
      state.bulkLoader = false;
      state.bulkFiles = action.payload;
    });

    builder.addMatcher(isAnyOf(UploadBulkAsync.rejected), (state, action) => {
      state.bulkLoader = false;
    });
  },
  reducers: {
    emptybulk: (state) => {
      return {
        ...initialState,
      };
    },
  },
});
export const { emptybulk } = studentBulkSlice.actions;
export default studentBulkSlice.reducer;
