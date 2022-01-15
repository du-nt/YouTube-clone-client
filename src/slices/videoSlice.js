import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

import { filterSubscribedUsers } from "./authSlice";

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
      state.comments.unshift({ ...payload, commentsCount: 0 });
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
    addTempReplySuccess: (state, { payload }) => {
      state.comments.map((comment) => {
        if (comment._id === payload.commentId) {
          if (comment.temReplies) {
            comment.temReplies = [...comment.temReplies, payload];
          } else {
            comment.temReplies = [payload];
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
    deleteTempReplySuccess: (state, { payload }) => {
      state.comments.map((comment) => {
        if (comment._id === payload.commentId) {
          comment.temReplies = comment.temReplies.filter(
            (reply) => reply._id !== payload._id
          );
        }
        return comment;
      });
    },
    likeCommentSuccess: (state, { payload }) => {
      state.comments.map((comment) => {
        if (comment._id === payload) {
          if (comment.isLiked) {
            comment.likesCount -= 1;
            comment.isLiked = !comment.isLiked;
          } else if (comment.isDisliked) {
            comment.dislikesCount -= 1;
            comment.isDisliked = !comment.isDisliked;
            comment.likesCount += 1;
            comment.isLiked = !comment.isLiked;
          } else {
            comment.likesCount += 1;
            comment.isLiked = !comment.isLiked;
          }
        }
        return comment;
      });
    },
    dislikeCommentSuccess: (state, { payload }) => {
      state.comments.map((comment) => {
        if (comment._id === payload) {
          if (comment.isDisliked) {
            comment.dislikesCount -= 1;
            comment.isDisliked = !comment.isDisliked;
          } else if (comment.isLiked) {
            comment.likesCount -= 1;
            comment.isLiked = !comment.isLiked;
            comment.dislikesCount += 1;
            comment.isDisliked = !comment.isDisliked;
          } else {
            comment.dislikesCount += 1;
            comment.isDisliked = !comment.isDisliked;
          }
        }
        return comment;
      });
    },
    likeReplySuccess: (state, { payload }) => {
      state.comments.map((comment) => {
        if (comment._id === payload.commentId) {
          comment.replies.map((reply) => {
            if (reply._id === payload._id) {
              if (reply.isLiked) {
                reply.likesCount -= 1;
                reply.isLiked = !reply.isLiked;
              } else if (reply.isDisliked) {
                reply.dislikesCount -= 1;
                reply.isDisliked = !reply.isDisliked;
                reply.likesCount += 1;
                reply.isLiked = !reply.isLiked;
              } else {
                reply.likesCount += 1;
                reply.isLiked = !reply.isLiked;
              }
            }
            return reply;
          });
        }
        return comment;
      });
    },
    likeTempReplySuccess: (state, { payload }) => {
      state.comments.map((comment) => {
        if (comment._id === payload.commentId) {
          comment.temReplies.map((reply) => {
            if (reply._id === payload._id) {
              if (reply.isLiked) {
                reply.likesCount -= 1;
                reply.isLiked = !reply.isLiked;
              } else if (reply.isDisliked) {
                reply.dislikesCount -= 1;
                reply.isDisliked = !reply.isDisliked;
                reply.likesCount += 1;
                reply.isLiked = !reply.isLiked;
              } else {
                reply.likesCount += 1;
                reply.isLiked = !reply.isLiked;
              }
            }
            return reply;
          });
        }
        return comment;
      });
    },
    dislikeReplySuccess: (state, { payload }) => {
      state.comments.map((comment) => {
        if (comment._id === payload.commentId) {
          comment.replies.map((reply) => {
            if (reply._id === payload._id) {
              if (reply.isDisliked) {
                reply.dislikesCount -= 1;
                reply.isDisliked = !reply.isDisliked;
              } else if (reply.isLiked) {
                reply.likesCount -= 1;
                reply.isLiked = !reply.isLiked;
                reply.dislikesCount += 1;
                reply.isDisliked = !reply.isDisliked;
              } else {
                reply.dislikesCount += 1;
                reply.isDisliked = !reply.isDisliked;
              }
            }
            return reply;
          });
        }
        return comment;
      });
    },
    dislikeTempReplySuccess: (state, { payload }) => {
      state.comments.map((comment) => {
        if (comment._id === payload.commentId) {
          comment.temReplies.map((reply) => {
            if (reply._id === payload._id) {
              if (reply.isDisliked) {
                reply.dislikesCount -= 1;
                reply.isDisliked = !reply.isDisliked;
              } else if (reply.isLiked) {
                reply.likesCount -= 1;
                reply.isLiked = !reply.isLiked;
                reply.dislikesCount += 1;
                reply.isDisliked = !reply.isDisliked;
              } else {
                reply.dislikesCount += 1;
                reply.isDisliked = !reply.isDisliked;
              }
            }
            return reply;
          });
        }
        return comment;
      });
    },
    topSort: (state) => {
      state.comments.sort((a, b) => b.likesCount - a.likesCount);
    },
    firstSort: (state) => {
      state.comments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
  },
});

export const addUrl = (values, resetForm) => async () => {
  try {
    await axios.post(`/video/adminUpload`, values);
    resetForm();
  } catch (error) { }
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
    const { user } = getState().auth;
    const isSubscribed = user.subscribedUsers.some(subscribedUser => subscribedUser.userTo._id === _id)
    const msg = isSubscribed ? "Subscription removed" : "Subscription added";
    toast.dark(msg, {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });
    dispatch(toggleSubscribeSuccess());
    isSubscribed && dispatch(filterSubscribedUsers(_id));
    axios.get(`/users/${_id}/toggleSubscribe`);
  } catch (error) { }
};

export const getRelatedVideos = (
  videoId,
  setVideos,
  setLoading,
  unmounted
) => async () => {
  try {
    const { data } = await axios.post("/video/relatedVideos", { _id: videoId });
    if (!unmounted) {
      setVideos(data);
      setLoading(false);
    }
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
    axios.get(`/video/like/${_id}`);
  } catch (error) { }
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
    axios.get(`/video/dislike/${_id}`);
  } catch (error) { }
};

export const upView = (_id) => async () => {
  try {
    axios.get(`/video/upView/${_id}`);
  } catch (error) { }
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
  } catch (error) { }
};

export const getComments = (_id) => async (dispatch, getState) => {
  try {
    const { user } = getState().auth;
    const url = user
      ? `/video/getComments/${_id}?lgId=${user._id}`
      : `/video/getComments/${_id}`;
    const { data } = await axios.get(url);
    dispatch(getCommentsSuccess(data));
  } catch (error) { }
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
  } catch (error) { }
};

export const addReply = (replyData, resetForm) => async (dispatch) => {
  try {
    const { data } = await axios.post("/video/addReply", replyData);
    dispatch(addReplySuccess(data));
    resetForm && resetForm();

    toast.dark("Reply added", {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });
  } catch (error) { }
};

export const addTempReply = (replyData, resetForm) => async (dispatch) => {
  try {
    const { data } = await axios.post("/video/addReply", replyData);
    dispatch(addTempReplySuccess(data));
    resetForm && resetForm();

    toast.dark("Reply added", {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });
  } catch (error) { }
};

export const getReplies = (_id, setLoading) => async (dispatch, getState) => {
  try {
    const { user } = getState().auth;
    const url = user
      ? `/video/getReplies/${_id}?lgId=${user._id}`
      : `/video/getReplies/${_id}`;
    const { data } = await axios.get(url);
    dispatch(getRepliesSuccess({ _id, data }));
    setLoading(false);
  } catch (error) { }
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
  } catch (error) { }
};

export const deleteTempReply = (reply) => async (dispatch) => {
  try {
    await axios.get(`/video/deleteReply/${reply._id}`);
    dispatch(deleteTempReplySuccess(reply));

    toast.dark("Reply deleted", {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });
  } catch (error) { }
};

export const likeComment = (_id) => async (dispatch) => {
  try {
    dispatch(likeCommentSuccess(_id));
    axios.get(`/video/likeComment/${_id}`);
  } catch (error) { }
};

export const dislikeComment = (_id) => async (dispatch) => {
  try {
    dispatch(dislikeCommentSuccess(_id));
    axios.get(`/video/dislikeComment/${_id}`);
  } catch (error) { }
};

export const likeReply = (_id, commentId) => async (dispatch) => {
  try {
    dispatch(likeReplySuccess({ _id, commentId }));
    axios.get(`/video/likeReply/${_id}`);
  } catch (error) { }
};

export const dislikeReply = (_id, commentId) => async (dispatch) => {
  try {
    dispatch(dislikeReplySuccess({ _id, commentId }));
    axios.get(`/video/dislikeReply/${_id}`);
  } catch (error) { }
};

export const likeTempReply = (_id, commentId) => async (dispatch) => {
  try {
    dispatch(likeTempReplySuccess({ _id, commentId }));
    axios.get(`/video/likeReply/${_id}`);
  } catch (error) { }
};

export const dislikeTempReply = (_id, commentId) => async (dispatch) => {
  try {
    dispatch(dislikeTempReplySuccess({ _id, commentId }));
    axios.get(`/video/dislikeReply/${_id}`);
  } catch (error) { }
};

// export const upload = (formData, { resetForm, onResetFile }) => async () => {
//   try {
//     let toastId = null;
//     const config = {
//       header: { "content-type": "multipart/form-data" },
//       onUploadProgress: (p) => {
//         const progress = p.loaded / p.total;
//         console.log(progress);
//         if (toastId === null) {
//           toastId = toast("Upload in Progress", {
//             progress: progress,
//             autoClose: false,
//             closeButton: false,
//             closeOnClick: false,
//             draggable: false,
//           });
//         } else {
//           toast.update(toastId, {
//             progress: progress,
//           });
//         }
//       },
//     };
//     const { data } = await axios.post("/video/upload", formData, config);

//     toast.done(toastId);
//     console.log(data);

//     resetForm();
//     onResetFile();
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const uploadToServer = (
  newVideo,
  resetForm,
  resetFiles,
  resetSubmitted
) => async () => {
  try {
    axios.defaults.withCredentials = true;
    await axios.post("/video/upload", newVideo);

    toast.update("progress", {
      type: toast.TYPE.SUCCESS,
      render: "Upload succeeded !",
      autoClose: 1500,
      hideProgressBar: true,
      closeButton: false,
      progress: undefined,
      className: "center",
    });
    resetSubmitted(resetForm, resetFiles);
  } catch (err) {
    toast.update("progress", {
      render: err.message,
      type: toast.TYPE.ERROR,
      hideProgressBar: true,
      autoClose: 1500,
      closeButton: false,
      progress: undefined,
      className: "center",
    });
    resetSubmitted();
  }
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
  likeCommentSuccess,
  dislikeCommentSuccess,
  likeReplySuccess,
  dislikeReplySuccess,
  topSort,
  firstSort,
  addTempReplySuccess,
  likeTempReplySuccess,
  dislikeTempReplySuccess,
  deleteTempReplySuccess
} = actions;

export default reducer;
