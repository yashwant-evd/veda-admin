import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  bulkquestionInAsync,
  bulkquestionOutAsync,
  createQuestionBankAsync,
  deleteQuestionAsync,
  getAllBulkFilesAsync,
  getAllQuestionAsync,
  getChapterByMultipleSubjectIdAsync,
  getQuestionByIdAsync,
  updateQuestionAsync,
  bulkuploadquestionAsync,
  getQuestionScholarshipTestAsync,
  getAllQuestionBankAsync
} from "./questionbank.async";

const initialState = {
  questionBankLoader: false,
  qbbulkLoader: false,
  bulkOut: [],
  bulkIn: [],
  getAllquestions: [],
  createQuestionBank: [],
  getQuestionById: [],
  updateQuestion: [],
  deleteQUestion: [],
  ChapterBySubject: [],
  bulkFiles: [],
  getQuestionScholarshipTest: [],
  getAllQuestionBank: []
};

export const questionBankSlice = createSlice({
  name: "Question Bank",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getAllQuestionAsync.pending,
        createQuestionBankAsync.pending,
        getQuestionByIdAsync.pending,
        updateQuestionAsync.pending,
        deleteQuestionAsync.pending,
        getChapterByMultipleSubjectIdAsync.pending,
        getAllBulkFilesAsync.pending,
        getQuestionScholarshipTestAsync.pending,
        getAllQuestionBankAsync.pending
      ),
      (state) => {
        state.questionBankLoader = true;
      }
    );
    builder.addMatcher(
      isAnyOf(bulkquestionOutAsync.pending, bulkuploadquestionAsync.pending),
      (state) => {
        state.qbbulkLoader = true;
      }
    );
    builder.addMatcher(
      isAnyOf(bulkquestionOutAsync.fulfilled),
      (state, action) => {
        state.bulkOut = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(bulkquestionInAsync.fulfilled, bulkuploadquestionAsync.fulfilled),
      (state, action) => {
        state.qbbulkLoader = false;
        state.bulkIn = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(getAllQuestionAsync.fulfilled),
      (state, action) => {
        state.questionBankLoader = false;
        state.getAllquestions = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(createQuestionBankAsync.fulfilled),
      (state, action) => {
        state.questionBankLoader = false;
        state.createQuestionBank = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(getQuestionByIdAsync.fulfilled),
      (state, action) => {
        state.questionBankLoader = false;
        state.getQuestionById = action.payload.data;
      }
    );
    builder.addMatcher(
      isAnyOf(updateQuestionAsync.fulfilled),
      (state, action) => {
        state.questionBankLoader = false;
        state.updateQuestion = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(deleteQuestionAsync.fulfilled),
      (state, action) => {
        state.questionBankLoader = false;
        state.deleteQUestion = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(getChapterByMultipleSubjectIdAsync.fulfilled),
      (state, action) => {
        state.questionBankLoader = false;
        state.ChapterBySubject = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(getAllBulkFilesAsync.fulfilled),
      (state, action) => {
        state.questionBankLoader = false;
        state.bulkFiles = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(getQuestionScholarshipTestAsync.fulfilled),
      (state, action) => {
        state.questionBankLoader = false;
        state.getQuestionScholarshipTest = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(getAllQuestionBankAsync.fulfilled),
      (state, action) => {
        state.questionBankLoader = false;
        state.getAllQuestionBank = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(
        bulkquestionOutAsync.rejected,
        bulkquestionInAsync.rejected,
        getAllQuestionAsync.rejected,
        createQuestionBankAsync.rejected,
        getQuestionByIdAsync.rejected,
        updateQuestionAsync.rejected,
        deleteQuestionAsync.rejected,
        getChapterByMultipleSubjectIdAsync.rejected,
        getAllBulkFilesAsync.rejected,
        bulkuploadquestionAsync.rejected,
        getQuestionScholarshipTestAsync.rejected,
        getAllQuestionBankAsync.rejected
      ),
      (state, action) => {
        state.qbbulkLoader = false;
        state.questionBankLoader = false;
      }
    );
  },
  reducers: {
    emptyQuestionBank: (state) => initialState
  }
});

export const { emptyQuestionBank } = questionBankSlice.actions;

export default questionBankSlice.reducer;
