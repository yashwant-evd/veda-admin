import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../AxiosClient";

export const staffAttendanceListAsync = createAsyncThunk(
  "admin/staffAttendanceList",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/staffAttendanceList?page=${payload.page}&limit=${
        payload.limit
      }&batchId=${payload.batchId || ""}`,
      [],
      toolkit
    );
  }
);
