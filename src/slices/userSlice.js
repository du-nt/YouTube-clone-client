import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      return payload;
    },
    toggleSubscribeSuccess: (state) => {
      if (state.isSubscribed) {
        state.subscribersCount -= 1;
      } else {
        state.subscribersCount += 1;
      }
      state.isSubscribed = !state.isSubscribed;
    },
  },
});
export const getProfile = (channelName, setLoading, setDead) => async (
  dispatch,
  getState
) => {
  try {
    const { user } = getState().auth;
    const url = user
      ? `/users/${channelName}?lgId=${user._id}`
      : `/users/${channelName}`;
    const { data } = await axios.get(url);
    dispatch(setProfile(data));
    setLoading(false);
  } catch (error) {
    setDead(true);
  }
};

export const search = (query, setVideos, setUsers, setLoading) => async () => {
  try {
    const search = query.trim();
    const { data } = await axios.get(`/users/search?q=${search}`);
    setUsers(data.users);
    setVideos(data.videos);
    setLoading(false);
  } catch (error) { }
};

export const getChannelVideos = (_id, setVideos, setLoading) => async () => {
  try {
    const { data } = await axios.get(`/users/${_id}/videos`);
    setVideos(data);
    setLoading(false);
  } catch (error) { }
};

export const getUsers = (setLoading, setUsers) => async () => {
  try {
    const { data } = await axios.get("/users/channel/subscribedUsers");
    setUsers(data);
    setLoading(false);
  } catch (error) { }
};

const { reducer, actions } = user;
export const { setProfile, toggleSubscribeSuccess } = actions;
export default reducer;
