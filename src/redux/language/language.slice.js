import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addLanguageKeyValueAsync,
  getAllLanguageKeyValueAsync,
  getAllLanguageAsync,
  getLanguageKeyValueByIdAsync,
  updateLanguageKeyValueByIdAsync,
  deleteLanguageKeyValueByIdAsync,
} from "./language.async";

const initialState = {
  languageLoader: false,
  adddLanguage: [],
  getLanguageLoader: false,
  getAllLanguage: [],
  getLangLoader: false,
  getAllLang: [],
  getLangKeyValueByIdLoader: false,
  getLangKeyValueById: [],
  updateLangKeyValueByIdLoader: false,
  updateLangKeyValueById: [],
  deleteLanguageLoader: false,
  deleteLanaguageData: [],
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(addLanguageKeyValueAsync.pending), (state) => {
      state.languageLoader = true;
    });

    builder.addMatcher(
      isAnyOf(addLanguageKeyValueAsync.fulfilled),
      (state, action) => {
        state.languageLoader = false;
        state.adddLanguage = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(addLanguageKeyValueAsync.rejected),
      (state, action) => {
        state.languageLoader = false;
      }
    );

    builder.addMatcher(
      isAnyOf(getAllLanguageKeyValueAsync.pending),
      (state) => {
        state.getLanguageLoader = true;
      }
    );

    builder.addMatcher(
      isAnyOf(getAllLanguageKeyValueAsync.fulfilled),
      (state, action) => {
        state.getLanguageLoader = false;
        state.getAllLanguage = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(getAllLanguageKeyValueAsync.rejected),
      (state, action) => {
        state.getLanguageLoader = false;
      }
    );

    builder.addMatcher(isAnyOf(getAllLanguageAsync.pending), (state) => {
      state.getLangLoader = true;
    });

    builder.addMatcher(
      isAnyOf(getAllLanguageAsync.fulfilled),
      (state, action) => {
        state.getLangLoader = false;
        state.getAllLang = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(getAllLanguageAsync.rejected),
      (state, action) => {
        state.getLangLoader = false;
      }
    );

    builder.addMatcher(
      isAnyOf(getLanguageKeyValueByIdAsync.pending),
      (state) => {
        state.getLangKeyValueByIdLoader = true;
      }
    );

    builder.addMatcher(
      isAnyOf(getLanguageKeyValueByIdAsync.fulfilled),
      (state, action) => {
        state.getLangKeyValueByIdLoader = false;
        state.getLangKeyValueById = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(getLanguageKeyValueByIdAsync.rejected),
      (state, action) => {
        state.getLangKeyValueByIdLoader = false;
      }
    );

    builder.addMatcher(
      isAnyOf(updateLanguageKeyValueByIdAsync.pending),
      (state) => {
        state.updateLangKeyValueByIdLoader = true;
      }
    );

    builder.addMatcher(
      isAnyOf(updateLanguageKeyValueByIdAsync.fulfilled),
      (state, action) => {
        state.updateLangKeyValueByIdLoader = false;
        state.updateLangKeyValueById = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(updateLanguageKeyValueByIdAsync.rejected),
      (state, action) => {
        state.updateLangKeyValueByIdLoader = false;
      }
    );

    builder.addMatcher(
      isAnyOf(deleteLanguageKeyValueByIdAsync.pending),
      (state) => {
        state.deleteLanguageLoader = true;
      }
    );

    builder.addMatcher(
      isAnyOf(deleteLanguageKeyValueByIdAsync.fulfilled),
      (state, action) => {
        state.deleteLanguageLoader = false;
        state.deleteLanaguageData = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(deleteLanguageKeyValueByIdAsync.rejected),
      (state, action) => {
        state.deleteLanguageLoader = false;
      }
    );
  },
  reducers: {
    emptyLanguage: (state) => initialState,
  },
});

export const { emptyLanguage } = languageSlice.actions;

export default languageSlice.reducer;
