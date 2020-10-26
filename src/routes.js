import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Header from "./components/HeaderSections/Header";
import BottomTabs from "./components/HomeSections/BottomTabs";
import Home from "./components/HomeSections/Home";
import Profile from "./components/ProfileSections/Profile";
import Private from "./components/Private";
import Trending from "./components/TrendingSections/Trending";
import Library from "./components/TrendingSections/Library";
import Subscriptions from "./components/Subscriptions/Subscriptions";
import VideoPlayer from "./components/VideoPlayerSections/VideoPlayer";

export const CustomizedRoute = ({
  component: Component,
  protect,
  noHeader,
  ...rest
}) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        protect ? (
          isAuthenticated ? (
            <div>
              {!noHeader && <BottomTabs />}
              <Component {...props} />
            </div>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        ) : (
          <div>
            {!noHeader && <BottomTabs />}
            <Component {...props} />
          </div>
        )
      }
    />
  );
};

CustomizedRoute.defaultProps = {
  protect: true,
  noHeader: false,
};

export const GoHomeIfLogged = ({
  component: Component,
  hasHeader,
  ...rest
}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isRedirect, setIsRedirect] = React.useState(true);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isRedirect ? (
          <Redirect to="/" />
        ) : (
          <>
            {hasHeader && <Header />}
            <Component {...props} setIsRedirect={setIsRedirect} />
          </>
        )
      }
    />
  );
};

GoHomeIfLogged.defaultProps = {
  hasHeader: false,
};

export const routes = [
  {
    path: "/",
    protect: false,
    exact: true,
    component: () => <Home />,
  },
  {
    path: "/users/:userNameParam",
    protect: false,
    component: () => <Profile />,
  },
  {
    path: "/private",
    component: () => <Private />,
  },
  {
    path: "/feed/trending",
    protect: false,
    component: () => <Trending />,
  },
  {
    path: "/feed/library",
    protect: false,
    component: () => <Library />,
  },
  {
    path: "/feed/subscriptions",
    component: () => <Subscriptions />,
  },
  {
    path: "/watch/:videoId",
    protect: false,
    noHeader: true,
    component: () => <VideoPlayer />,
  },
];
