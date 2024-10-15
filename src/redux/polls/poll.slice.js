import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createPollAsync,
  getPollByUserIdAsync,
  getAllPollsByStatusIdAsync,
  deletePollByIdAsync,
  updatePollByIdAsync,
  getPollByIdAsync,
  pollReportByIdAsync,
  getStudentPollByPollIdAsync,
  pollReportExcelDownloadAsync,
} from "./poll.async";

const initialState = {
  pollLoader: false,
  addPollData: [],
  getPollLoader: false,
  getPollData: [],
  getPollsStatusLoader: false,
  getPollsStatusData: [],
  deletePollLoader: false,
  deletePollData: [],
  updatePollData: [],
  getPollById: [],
  getReportsByIdLoader: true,
  getReportById: [],
  updatePollLoader: true,
  getAllReportById: [],
  getAllReportLoader: true,
  downloadReport: [],
  downloadReportLoader: true,
  getPollByIdLoader: true,
};

export const pollsSlice = createSlice({
  name: "polls",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(createPollAsync.pending), (state) => {
      state.pollLoader = true;
    });

    builder.addMatcher(isAnyOf(createPollAsync.fulfilled), (state, action) => {
      state.pollLoader = false;
      state.addPollData = action.payload;
    });

    builder.addMatcher(isAnyOf(createPollAsync.rejected), (state, action) => {
      state.pollLoader = false;
    });

    builder.addMatcher(isAnyOf(getPollByUserIdAsync.pending), (state) => {
      state.getPollLoader = true;
      state.pollLoader = true;
    });

    builder.addMatcher(
      isAnyOf(getPollByUserIdAsync.fulfilled),
      (state, action) => {
        state.getPollLoader = false;
        state.pollLoader = false;
        state.getPollData = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(getPollByUserIdAsync.rejected),
      (state, action) => {
        state.getPollLoader = false;
        state.pollLoader = false;
      }
    );

    builder.addMatcher(isAnyOf(getAllPollsByStatusIdAsync.pending), (state) => {
      state.getPollsStatusLoader = true;
      state.pollLoader = true;
    });

    builder.addMatcher(
      isAnyOf(getAllPollsByStatusIdAsync.fulfilled),
      (state, action) => {
        state.getPollsStatusLoader = false;
        state.pollLoader = false;
        state.getPollsStatusData = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(getAllPollsByStatusIdAsync.rejected),
      (state, action) => {
        state.getPollsStatusLoader = false;
        state.pollLoader = false;
      }
    );

    builder.addMatcher(isAnyOf(deletePollByIdAsync.pending), (state) => {
      state.deletePollLoader = true;
      state.pollLoader = true;
    });

    builder.addMatcher(
      isAnyOf(deletePollByIdAsync.fulfilled),
      (state, action) => {
        state.deletePollLoader = false;
        state.pollLoader = false;
        state.deletePollData = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(deletePollByIdAsync.rejected),
      (state, action) => {
        state.deletePollLoader = false;
        state.pollLoader = false;
      }
    );

    builder.addMatcher(isAnyOf(updatePollByIdAsync.pending), (state) => {
      state.updatePollLoader = true;
    });

    builder.addMatcher(
      isAnyOf(updatePollByIdAsync.fulfilled),
      (state, action) => {
        state.updatePollLoader = false;
        state.updatePollData = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(updatePollByIdAsync.rejected),
      (state, action) => {
        state.updatePollLoader = false;
      }
    );

    builder.addMatcher(isAnyOf(getPollByIdAsync.pending), (state) => {
      state.pollLoader = true;
      state.getPollByIdLoader = true;
    });

    builder.addMatcher(isAnyOf(getPollByIdAsync.fulfilled), (state, action) => {
      state.pollLoader = false;
      state.getPollByIdLoader = false;
      state.getPollById = action.payload;
    });

    builder.addMatcher(isAnyOf(getPollByIdAsync.rejected), (state, action) => {
      state.pollLoader = false;
      state.getPollByIdLoader = false;
    });

    builder.addMatcher(isAnyOf(pollReportByIdAsync.pending), (state) => {
      state.getReportsByIdLoader = true;
      state.pollLoader = true;
    });

    builder.addMatcher(
      isAnyOf(pollReportByIdAsync.fulfilled),
      (state, action) => {
        state.getReportsByIdLoader = false;
        state.pollLoader = false;
        state.getReportById = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(pollReportByIdAsync.rejected),
      (state, action) => {
        state.getReportsByIdLoader = false;
        state.pollLoader = false;
      }
    );

    builder.addMatcher(
      isAnyOf(getStudentPollByPollIdAsync.pending),
      (state) => {
        state.getAllReportLoader = true;
      }
    );

    builder.addMatcher(
      isAnyOf(getStudentPollByPollIdAsync.fulfilled),
      (state, action) => {
        state.getAllReportLoader = false;
        state.getAllReportById = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(getStudentPollByPollIdAsync.rejected),
      (state, action) => {
        state.getAllReportLoader = false;
      }
    );

    builder.addMatcher(
      isAnyOf(pollReportExcelDownloadAsync.pending),
      (state) => {
        state.downloadReportLoader = true;
      }
    );

    builder.addMatcher(
      isAnyOf(pollReportExcelDownloadAsync.fulfilled),
      (state, action) => {
        state.downloadReportLoader = false;
        state.downloadReport = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(pollReportExcelDownloadAsync.rejected),
      (state, action) => {
        state.downloadReportLoader = false;
      }
    );
  },
  reducers: {
    emptyPoll: (state) => initialState,
  },
});

export const { emptyPoll } = pollsSlice.actions;

export default pollsSlice.reducer;
