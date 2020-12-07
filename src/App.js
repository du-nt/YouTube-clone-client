import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./components/Auths/Register";
import Login from "./components/Auths/Login";
import ForgotPassword from "./components/Auths/ForgotPassword";
import ResetPassword from "./components/Auths/ResetPassword";
import NotFound from "./components/Others/NotFound";
import AdminUpload from "./components/UploadSections/AdminUpload";
import SearchResult from "./components/SearchResultSections/SearchResult";

import { getCurrentUser } from "./slices/authSlice";

import {
  routes,
  GoHomeIfLogged,
  CustomizedRoute,
  AdminRoute,
  CustomizedRoute2,
} from "./routes";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser(setLoading));
  }, [dispatch]);

  return (
    !loading && (
      <>
        <ToastContainer position="bottom-left" hideProgressBar newestOnTop />
        <Switch>
          <GoHomeIfLogged exact path="/login" component={Login} />
          <GoHomeIfLogged exact path="/register" component={Register} />
          <GoHomeIfLogged
            exact
            path="/forgotpassword"
            component={ForgotPassword}
          />
          <GoHomeIfLogged
            exact
            path="/password/reset/:userId/:token"
            component={ResetPassword}
          />
          <AdminRoute path="/admin/upload" component={AdminUpload} />

          <CustomizedRoute2 exact path="/results" component={SearchResult} />

          {routes.map((route, index) => (
            <CustomizedRoute key={index} {...route} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </>
    )
  );
}
