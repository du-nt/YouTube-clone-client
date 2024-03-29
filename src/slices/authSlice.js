import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_PROD_API_URL}api`;

axios.defaults.withCredentials = true;

const config = {
  header: { "content-type": "multipart/form-data" },
};

const initialState = {
  isAuthenticated: false,
  user: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.isAuthenticated = true;
      state.user = payload;
    },
    logoutSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    changePhotoSuccess: (state, { payload }) => {
      state.user.avatar = payload;
    },
    changeCoverSuccess: (state, { payload }) => {
      state.user.cover = payload;
    },
    editSuccess: (state, { payload }) => {
      state.user.displayName = payload.displayName;
    },
    filterSubscribedUsers: (state, { payload }) => {
      const subscribedUsers = state.user.subscribedUsers.filter((user) => user.userTo._id !== payload);
      return {
        ...state,
        user: {
          ...state.user,
          subscribedUsers,
        }
      }
    },
    addSubscribedUsers: (state, { payload }) => {
      state.user.subscribedUsers.push(payload);
    }
  },
});

export const register =
  (values, toLogin, { setErrors, resetForm }) =>
    async () => {
      try {
        await axios.post("/auth/register", values);
        resetForm();
        toLogin();
      } catch (error) {
        error?.response?.data && setErrors(error.response.data);
      }
    };

export const login =
  (values, goBack, setIsRedirect, { setErrors, resetForm }) =>
    async (dispatch) => {
      try {
        const { data } = await axios.post("/auth/login", values);
        resetForm();
        setIsRedirect(false);
        dispatch(setCurrentUser(data));
        goBack();
      } catch (error) {
        error?.response?.data && setErrors(error.response.data);
      }
    };

// export const changePassword =
//   (values, toast, { setErrors, resetForm }) =>
//     async () => {
//       try {
//         await axios.post("/auth/changePassword", values);
//         resetForm();
//         toast.success("Password changed", {
//           position: "top-right",
//           autoClose: 2000,
//         });
//       } catch (error) {
//         setErrors(error.response.data);
//         toast.error("Error!", {
//           position: "top-right",
//           autoClose: 2000,
//         });
//       }
//     };

export const forgotPassword =
  (values, { setErrors, resetForm }, setMailSent) =>
    async () => {
      try {
        await axios.get(`/auth/resetPassword/user/${values.email}`);
        resetForm();
        setMailSent(true);
      } catch (error) {
        setErrors({ email: error?.response?.data?.error });
      }
    };

export const resetPassword =
  (values, { userId, token }, { setErrors, resetForm }, setConfirmed) =>
    async () => {
      try {
        await axios.post(`/auth/receiveNewPassword/${userId}/${token}`, values);
        resetForm();
        setConfirmed(true);
      } catch (error) {
        setErrors({ newPassword: error?.message });
      }
    };

export const logout = (closeMenu, history) => async (dispatch) => {
  try {
    await axios.get("/auth/logout");
    closeMenu && closeMenu();
    dispatch(logoutSuccess());
    history && history.push("/");
  } catch (error) {
    closeMenu && closeMenu();
    history && history.push("/");
  }
};

export const getCurrentUser = (setLoading) => async (dispatch) => {
  try {
    const { data } = await axios.get("/auth");
    dispatch(setCurrentUser(data));
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};

export const editUser =
  (values, resetForm, handleCloseForm) => async (dispatch) => {
    try {
      await axios.post("/users/editUser", values);
      dispatch(editSuccess(values));
      resetForm();
      handleCloseForm();
    } catch (error) { }
  };

export const changePhoto = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/users/changePhoto", data, config);
    dispatch(changePhotoSuccess(res.data.avatar));
  } catch (error) { }
};

export const changeCover = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/users/changeCover", data, config);
    dispatch(changeCoverSuccess(res.data.cover));
  } catch (error) { }
};

const { reducer, actions } = auth;
export const {
  logoutSuccess,
  setCurrentUser,
  changePhotoSuccess,
  changeCoverSuccess,
  editSuccess,
  filterSubscribedUsers,
  addSubscribedUsers
} = actions;

export default reducer;
