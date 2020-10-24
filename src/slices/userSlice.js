import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const post = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      return payload;
    },
  },
});
export const getProfile = (
  userNameParam,
  setLoading,
  isMountedRefCurrent,
  setIsDead
) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/users/user/${userNameParam}`);
    if (isMountedRefCurrent) {
      dispatch(setProfile(data));
      setLoading(false);
    }
  } catch (error) {
    if (setIsDead) setIsDead(true);
  }
};

export const search = (value, setDisplay, setUsers) => async () => {
  try {
    const search = value.trim();
    if (search) {
      const { data } = await axios.get(`/users/search?userName=${search}`);
      setUsers(data);
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  } catch (error) {
    setDisplay(false);
  }
};

const { reducer, actions } = post;
export const { setProfile } = actions;
export default reducer;
