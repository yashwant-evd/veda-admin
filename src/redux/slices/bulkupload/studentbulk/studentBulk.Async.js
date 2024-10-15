import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../../AxiosClient";

export const assignBatchToEmployeeAsync = createAsyncThunk(
  "admin/assignBatchToEmployee",
  async (payload, toolkit) => {
    return await AxiosClient(
      "POST",
      `/assignBatchToEmployee`,
      payload,
      toolkit
    );
  }
);

export const UploadBulkAsync = createAsyncThunk(
  "admin/createBulkAsync",
  async (payload, toolkit) => {
    return await AxiosClient("POST", `/uploadStudentExcel`, payload, toolkit);
  }
);

export const getAllBulkFiles = createAsyncThunk(
  "admin/getAllBulkFiles",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getAllBulkFiles?page=${payload.page}&limit=${payload.limit}&fileType=student`,
      [],
      toolkit
    );
  }
);

export const getAllBulkFilesInBatch = createAsyncThunk(
  "admin/getAllBulkFiles",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getAllBulkFiles?page=${payload.page}&limit=${payload.limit}&fileType=assignBatch`,
      [],
      toolkit
    );
  }
);
