import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
