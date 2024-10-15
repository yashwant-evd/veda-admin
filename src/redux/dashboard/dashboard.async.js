import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../AxiosClient";

export const getDashboardAsync = createAsyncThunk(
  "admin/getDashboard",
  async (payload, toolkit) => {
    return await AxiosClient("GET", `/dashboard`, [], toolkit);
  }
);
