import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import videoReducer from "./slices/videoSlice";
import drawerReducer from "./slices/drawerSlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  video: videoReducer,
  drawer: drawerReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
