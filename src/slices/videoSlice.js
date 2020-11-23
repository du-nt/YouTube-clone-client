import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = {};

// const video = createSlice({
//   name: "video",
//   initialState,
//   reducers: {
//     setProfile: (state, { payload }) => {
//       return payload;
//     },
//   },
// });

export const addUrl = (values, resetForm) => async (dispatch) => {
  try {
    await axios.post(`/video/adminUpload/`, values);
    resetForm();
  } catch (error) {}
};

// const { reducer, actions } = video;
// export const { setProfile } = actions;
// export default reducer;
