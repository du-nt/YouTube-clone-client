import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import videoReducer from "./slices/videoSlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  video: videoReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
