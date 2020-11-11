import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Register from "./components/Auths/Register";
import Login from "./components/Auths/Login";
import ForgotPassword from "./components/Auths/ForgotPassword";
import ResetPassword from "./components/Auths/ResetPassword";
import NotFound from "./components/NotFound";
import AdminUpload from "./components/UploadSections/AdminUpload";

import { getCurrentUser } from "./slices/authSlice";

import { routes, GoHomeIfLogged, CustomizedRoute, AdminRoute } from "./routes";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser(setLoading));
  }, [dispatch]);

  return (
    !loading && (
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

        {routes.map((route, index) => (
          <CustomizedRoute key={index} {...route} />
        ))}
        <Route component={NotFound} />
      </Switch>
    )
  );
}
