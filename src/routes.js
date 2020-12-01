import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Header from "./components/HeaderSections/Header";
import BottomTabs from "./components/HomeSections/BottomTabs";
import Home from "./components/HomeSections/Home";
import Channel from "./components/ChannelSections/Channel";
import Profile from "./components/ProfileSections/Profile";
import Upload from "./components/UploadSections/Upload";
import Library from "./components/LibrarySections/Library";
import Subscriptions from "./components/Subscriptions/Subscriptions";
import VideoPlayer from "./components/VideoPlayerSections/VideoPlayer";
import Trending from "./components/Trending";

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
            <>
              {!noHeader && <BottomTabs />}
              <Component {...props} />
            </>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        ) : (
          <>
            {!noHeader && <BottomTabs />}
            <Component {...props} />
          </>
        )
      }
    />
  );
};

CustomizedRoute.defaultProps = {
  protect: true,
  noHeader: false,
};

export const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user.adminRole ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
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
    path: "/feed/subscriptions",
    component: () => <Subscriptions />,
  },
  {
    path: "/upload",
    noHeader: true,
    component: () => <Upload />,
  },
  {
    path: "/profile/:userId",
    noHeader: true,
    component: () => <Profile />,
  },
  {
    path: "/",
    protect: false,
    exact: true,
    component: () => <Home />,
  },
  {
    path: "/channel/:channelName",
    protect: false,
    component: () => <Channel />,
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
    path: "/watch/:videoId",
    protect: false,
    noHeader: true,
    component: () => <VideoPlayer />,
  },
];
