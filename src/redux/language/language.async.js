import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "redux/AxiosClient";

export const addLanguageKeyValueAsync = createAsyncThunk(
  "admin/addLanguageKeyValue",
  async (payload, toolkit) => {
    return await AxiosClient("POST", `/addLanguageKeyValue`, payload, toolkit);
  }
);

export const getAllLanguageKeyValueAsync = createAsyncThunk(
  "admin/getAllLanguageKeyValue",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getAllLanguageKeyValue?page=${payload.page}&limit=${payload.limit}&language=${payload.language}`,
      payload,
      toolkit
    );
  }
);

export const getAllLanguageAsync = createAsyncThunk(
  "admin/getAllLanguage",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getAllLanguage?page=${payload.page}&limit=${payload.limit}`,
      payload,
      toolkit
    );
  }
);

export const getLanguageKeyValueByIdAsync = createAsyncThunk(
  "admin/getLanguageKeyValueById",
  async (payload, toolkit) => {
    return await AxiosClient(
      "GET",
      `/getLanguageKeyValueById/${payload}`,
      payload,
      toolkit
    );
  }
);

export const updateLanguageKeyValueByIdAsync = createAsyncThunk(
  "admin/updateLanguageKeyValueById",
  async (payload, toolkit) => {
    return await AxiosClient(
      "PUT",
      `/updateLanguageKeyValueById`,
      payload,
      toolkit
    );
  }
);

export const deleteLanguageKeyValueByIdAsync = createAsyncThunk(
  "admin/deleteLanguageKeyValueById",
  async (payload, toolkit) => {
    return await AxiosClient(
      "DELETE",
      `/deleteLanguageKeyValueById/${payload}`,
      [],
      toolkit
    );
  }
);
