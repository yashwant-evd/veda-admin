import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "redux/AxiosClient";

export const getAllStudentsByBatchAsync = createAsyncThunk(
  "admin/getAllStudentsByBatch",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getAllStudentsByBatch?page=${payload.page}&limit=${payload.limit}&batchTypeId=${payload.batchTypeId}&startdate=${payload.startdate}&enddate=${payload.enddate}&employeeCode=${payload.employeeCode}&department=${payload.department}`,
      payload,
      toolkit
    );
  }
);

export const getAllEmployeeByBatchIdAsync = createAsyncThunk(
  "admin/getAllEmployeeByBatchId",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getAllEmployeeByBatchId?page=${payload.page}&limit=${payload.limit}&batchTypeId=${payload.batchTypeId}&employeeCode=${payload.employeeCode}&type=${payload.type}`,
      payload,
      toolkit
    );
  }
);

export const getAllTestReportsByBatchAsync = createAsyncThunk(
  "admin/getAllTestReportsByBatch",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getAllTestReportsByBatch?page=${payload.page}&limit=${payload.limit}&studentId=${payload.studentId}&type=${payload.type}&batchTypeId=${payload.batchTypeId}&status=${payload.status}`,
      payload,
      toolkit
    );
  }
);

export const getTestReportsByUserIdAsync = createAsyncThunk(
  "admin/getTestReportsByUserId",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getTestReportsByUserId?page=${payload.page}&limit=${payload.limit}&type=${payload.type}&status=${payload.status}&studentId=${payload.studentId}&batchId=${payload.batchId}`,
      payload,
      toolkit
    );
  }
);
