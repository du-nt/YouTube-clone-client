import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "/api/";
axios.defaults.baseURL = "https://api-youtubeclone.herokuapp.com/api/";
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
  },
});

export const register = (
  values,
  toLogin,
  { setErrors, resetForm }
) => async () => {
  try {
    await axios.post("/auth/register", values);
    resetForm();
    toLogin();
  } catch (error) {
    setErrors(error.response.data);
  }
};

export const login = (
  values,
  goBack,
  setIsRedirect,
  { setErrors, resetForm }
) => async (dispatch) => {
  try {
    await axios.post("/auth/login", values);
    const { data } = await axios.get("/auth");
    resetForm();
    setIsRedirect(false);
    dispatch(setCurrentUser(data));
    goBack();
  } catch (error) {
    setErrors(error?.response?.data);
  }
};

export const changePassword = (
  values,
  toast,
  { setErrors, resetForm }
) => async () => {
  try {
    await axios.post("/auth/changePassword", values);
    resetForm();
    toast.success("Password changed", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (error) {
    setErrors(error.response.data);
    toast.error("Error!", {
      position: "top-right",
      autoClose: 2000,
    });
  }
};

export const forgotPassword = (
  values,
  { setErrors, resetForm },
  setMailSent
) => async () => {
  try {
    await axios.get(`/auth/resetPassword/user/${values.email}`);
    resetForm();
    setMailSent(true);
  } catch (error) {
    setErrors({ email: error.response.data.error });
  }
};

export const resetPassword = (
  values,
  { userId, token },
  { setErrors, resetForm },
  setConfirmed
) => async () => {
  try {
    await axios.post(`/auth/receiveNewPassword/${userId}/${token}`, values);
    resetForm();
    setConfirmed(true);
  } catch (error) {
    setErrors({ email: error.response.data });
  }
};

export const logout = (history, closeMenu) => async (dispatch) => {
  try {
    await axios.get("/auth/logout");
    closeMenu();
    dispatch(logoutSuccess());
    history.push("/");
  } catch (error) {
    closeMenu();
    history.push("/");
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

export const editUser = (values, resetForm, handleCloseForm) => async (
  dispatch
) => {
  try {
    await axios.post("/users/editUser", values);
    dispatch(editSuccess(values));
    resetForm();
    handleCloseForm();
  } catch (error) {}
};

export const changePhoto = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/users/changePhoto", data, config);
    dispatch(changePhotoSuccess(res.data.avatar));
  } catch (error) {}
};

export const changeCover = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/users/changeCover", data, config);
    dispatch(changeCoverSuccess(res.data.cover));
  } catch (error) {}
};

export const removePhoto = (toast) => async (dispatch) => {
  try {
    const res = await axios.get("users/removePhoto");
    dispatch(changePhotoSuccess(res.data.avatar));
    toast.success("Profile photo removed", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (error) {
    toast.error("Error!", {
      position: "top-right",
      autoClose: 2000,
    });
  }
};

const { reducer, actions } = auth;
export const {
  logoutSuccess,
  setCurrentUser,
  changePhotoSuccess,
  changeCoverSuccess,
  editSuccess,
} = actions;

export default reducer;
