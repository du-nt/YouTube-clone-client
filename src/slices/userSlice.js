import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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

export const toggleSubscribe = (_id) => async (dispatch, getState) => {
  try {
    const { isSubscribed } = getState().user;
    const msg = isSubscribed ? "Subscription removed" : "Subscription added";
    await axios.get(`/users/${_id}/toggleSubscribe`);
    dispatch(toggleSubscribeSuccess());
    toast.dark(msg, {
      position: "bottom-left",
      hideProgressBar: true,
      autoClose: 2000,
      closeButton: false,
    });
  } catch (error) {}
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

export const getChannelVideos = (_id, setVideos, setLoading) => async () => {
  try {
    const { data } = await axios.get(`/users/${_id}/videos`);
    setVideos(data);
    setLoading(false);
  } catch (error) {}
};

export const getUsers = (setLoading, setUsers) => async () => {
  try {
    const { data } = await axios.get("/users/channel/subscribedUsers");
    setUsers(data);
    setLoading(false);
  } catch (error) {}
};

const { reducer, actions } = user;
export const { setProfile, toggleSubscribeSuccess } = actions;
export default reducer;
