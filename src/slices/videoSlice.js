import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {};

const video = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo: (state, { payload }) => {
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
    likeSuccess: (state) => {
      if (state.isLiked) {
        state.likesCount -= 1;
        state.isLiked = !state.isLiked;
      } else if (state.isDisliked) {
        state.dislikesCount -= 1;
        state.isDisliked = !state.isDisliked;
        state.likesCount += 1;
        state.isLiked = !state.isLiked;
      } else {
        state.likesCount += 1;
        state.isLiked = !state.isLiked;
      }
    },
    dislikeSuccess: (state) => {
      if (state.isDisliked) {
        state.dislikesCount -= 1;
        state.isDisliked = !state.isDisliked;
      } else if (state.isLiked) {
        state.likesCount -= 1;
        state.isLiked = !state.isLiked;
        state.dislikesCount += 1;
        state.isDisliked = !state.isDisliked;
      } else {
        state.dislikesCount += 1;
        state.isDisliked = !state.isDisliked;
      }
    },
  },
});

export const addUrl = (values, resetForm) => async () => {
  try {
    await axios.post(`/video/adminUpload`, values);
    resetForm();
  } catch (error) {}
};

export const getVideos = (setVideos, setLoading) => async () => {
  try {
    const { data } = await axios.get(`/video/recommendedVideos`);
    setVideos(data);
    setLoading(false);
  } catch (error) {
    toast.error("Errored!", {
      position: "bottom-left",
      hideProgressBar: true,
      autoClose: 5000,
      closeButton: false,
    });
  }
};

export const getVideo = (videoId, setDead, setLoading) => async (
  dispatch,
  getState
) => {
  try {
    const { user } = getState().auth;
    const url = user
      ? `/video/${videoId}?lgId=${user._id}`
      : `/video/${videoId}`;
    const { data } = await axios.get(url);
    dispatch(setVideo(data));
    setLoading(false);
  } catch (error) {
    setDead(true);
  }
};

export const getSubscriptionVideos = (
  setVideos,
  setSixSubscribedUsers,
  setLoading
) => async () => {
  try {
    const { data } = await axios.get(`/video/getSubscriptionVideos`);
    setSixSubscribedUsers(data.sixSubscribedUsers);
    setVideos(data.videos);
    setLoading(false);
  } catch (error) {
    toast.error("Errored!", {
      position: "bottom-left",
      hideProgressBar: true,
      autoClose: 5000,
      closeButton: false,
    });
  }
};

export const toggleSubscribe = (_id) => async (dispatch, getState) => {
  try {
    const { isSubscribed } = getState().video;
    const msg = isSubscribed ? "Subscription removed" : "Subscription added";
    toast.dark(msg, {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });
    dispatch(toggleSubscribeSuccess());
    await axios.get(`/users/${_id}/toggleSubscribe`);
  } catch (error) {}
};

export const getRelatedVideos = (
  videoId,
  setVideos,
  setLoading
) => async () => {
  try {
    const { data } = await axios.post("/video/relatedVideos", { _id: videoId });
    setVideos(data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};

export const like = (_id) => async (dispatch, getState) => {
  try {
    const { isLiked } = getState().video;
    const msg = isLiked ? "Removed from Liked videos" : "Added to Liked videos";
    toast.dark(msg, {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });

    dispatch(likeSuccess());
    await axios.get(`/video/like/${_id}`);
  } catch (error) {}
};

export const dislike = (_id) => async (dispatch, getState) => {
  try {
    const { isDisliked } = getState().video;
    const msg = isDisliked ? "Disliked removed" : "You dislike this video";
    toast.dark(msg, {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });

    dispatch(dislikeSuccess());
    await axios.get(`/video/dislike/${_id}`);
  } catch (error) {}
};

export const upView = (_id) => async () => {
  try {
    await axios.get(`/video/upView/${_id}`);
  } catch (error) {}
};

const { reducer, actions } = video;
export const {
  setVideo,
  toggleSubscribeSuccess,
  likeSuccess,
  dislikeSuccess,
} = actions;
export default reducer;
