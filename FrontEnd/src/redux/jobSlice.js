
import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allAdminJobs: [],
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    savedJobs: []  // ✅ Add this to prevent "undefined" error
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },

    toggleBookmark: (state, action) => {
      const job = action.payload;
      const index = state.savedJobs.findIndex((savedJob) => savedJob._id === job._id);
      if (index >= 0) {
        state.savedJobs.splice(index, 1); // Remove if already saved
      } else {
        state.savedJobs.push(job); // Add if not saved
      }
    }
  },
});

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery, toggleBookmark } = jobSlice.actions;
export default jobSlice.reducer;
