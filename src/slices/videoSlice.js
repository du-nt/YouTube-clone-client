import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {};

const video = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo: (state, { payload }) => {
      return { ...payload, comments: [], commentsLoaded: false };
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
    addCommentSuccess: (state, { payload }) => {
      state.commentsCount += 1;
      state.comments.unshift(payload);
    },
    getCommentsSuccess: (state, { payload }) => {
      state.comments = payload;
      state.commentsLoaded = true;
    },
    deleteCommentSuccess: (state, { payload }) => {
      return {
        ...state,
        commentsCount: state.commentsCount - 1,
        comments: state.comments.filter((comment) => comment._id !== payload),
      };
    },
    addReplySuccess: (state, { payload }) => {
      state.comments.map((comment) => {
        if (comment._id === payload.commentId) {
          comment.commentsCount = comment.commentsCount + 1;
          if (comment.replies) {
            comment.replies = [...comment.replies, payload];
          } else {
            comment.replies = [payload];
            comment.isLoaded = true;
          }
        }
        return comment;
      });
    },
    getRepliesSuccess: (state, { payload }) => {
      state.comments.map((comment) => {
        if (comment._id === payload._id) {
          comment.isLoaded = true;
          comment.replies = payload.data;
        }
        return comment;
      });
    },
    deleteReplySuccess: (state, { payload }) => {
      state.comments.map((comment) => {
        if (comment._id === payload.commentId) {
          comment.commentsCount = comment.commentsCount - 1;
          comment.replies = comment.replies.filter(
            (reply) => reply._id !== payload._id
          );
        }
        return comment;
      });
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

export const addComment = (_id, newComment, resetForm) => async (dispatch) => {
  try {
    const { data } = await axios.post("/video/addComment", {
      _id,
      text: newComment,
    });
    dispatch(addCommentSuccess(data));
    resetForm();

    toast.dark("Comment added", {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });
  } catch (error) {}
};

export const getComments = (_id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/video/getComments/${_id}`);
    dispatch(getCommentsSuccess(data));
  } catch (error) {}
};

export const deleteComment = (_id) => async (dispatch) => {
  try {
    await axios.get(`/video/deleteComment/${_id}`);
    dispatch(deleteCommentSuccess(_id));

    toast.dark("Comment deleted", {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });
  } catch (error) {}
};

export const addReply = (replyData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/video/addReply", replyData);
    dispatch(addReplySuccess(data));

    toast.dark("Reply added", {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });
  } catch (error) {}
};

export const getReplies = (_id, setLoading) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/video/getReplies/${_id}`);
    dispatch(getRepliesSuccess({ _id, data }));
    setLoading(false);
  } catch (error) {}
};

export const deleteReply = (reply) => async (dispatch) => {
  try {
    await axios.get(`/video/deleteReply/${reply._id}`);
    dispatch(deleteReplySuccess(reply));

    toast.dark("Reply deleted", {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });
  } catch (error) {}
};

const { reducer, actions } = video;
export const {
  setVideo,
  toggleSubscribeSuccess,
  likeSuccess,
  dislikeSuccess,
  addCommentSuccess,
  getCommentsSuccess,
  addReplySuccess,
  getRepliesSuccess,
  deleteReplySuccess,
  deleteCommentSuccess,
} = actions;

export default reducer;
