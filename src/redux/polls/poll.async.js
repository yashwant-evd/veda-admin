import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "redux/AxiosClient";

export const createPollAsync = createAsyncThunk(
  "admin/addPoll",
  async (payload, toolkit) => {
    return await AxiosClient("POST", `/addPoll`, payload, toolkit);
  }
);

export const getPollByUserIdAsync = createAsyncThunk(
  "admin/getPoll",
  async (payload, toolkit) => {
    return await AxiosClient("GET", `/getPollByUserId`, payload, toolkit);
  }
);

export const pollReportByIdAsync = createAsyncThunk(
  "admin/pollReportById",
  async (payload, toolkit) => {
    return await AxiosClient("GET", `/pollReportById/${payload.pollId}`, payload, toolkit);
  }
);

export const getAllPollsByStatusIdAsync = createAsyncThunk(
  "admin/getPollsbyStatus",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getAllPolls?status=${payload.status}&page=${payload.page}&limit=${payload.limit}`,
      payload,
      toolkit
    );
  }
);

export const getStudentPollByPollIdAsync = createAsyncThunk(
  "admin/getStudentPollByPollId",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getStudentPollByPollId?pollId=${payload.pollId}&page=${payload.page}&limit=${payload.limit}`,
      payload,
      toolkit
    );
  }
);

export const pollReportExcelDownloadAsync = createAsyncThunk(
  "admin/pollReportExcelDownload",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/pollReportExcelDownload?pollId=${payload}`,
      payload,
      toolkit
    );
  }
);

export const deletePollByIdAsync = createAsyncThunk(
  "admin/deletePollById",
  async (payload, toolkit) => {
    return await AxiosClient(
      "DELETE",
      `/deletePollById/${payload}`,
      [],
      toolkit
    );
  }
);

export const updatePollByIdAsync = createAsyncThunk(
  "admin/updatePollById",
  async (payload, toolkit) => {
    return await AxiosClient("PUT", `/updatePollById`, payload, toolkit);
  }
);

export const getPollByIdAsync = createAsyncThunk(
  "admin/getPollById",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getPollById/${payload}`,
      payload,
      toolkit
    );
  }
);
