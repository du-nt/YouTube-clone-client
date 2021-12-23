import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

import BottomTabs from "./components/HomeSections/BottomTabs";
import Home from "./components/HomeSections/Home";
import Channel from "./components/ChannelSections/Channel";
import Profile from "./components/ProfileSections/Profile";
import Upload from "./components/UploadSections/Upload";
import Library from "./components/LibrarySections/Library";
import Subscriptions from "./components/Subscriptions/Subscriptions";
import VideoPlayer from "./components/VideoPlayerSections/VideoPlayer";
import Trending from "./components/Others/Trending";
import ChannelList from "./components/ChannelListSections/ChannelList";

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

export const CustomizedRoute2 = ({ component: Component, ...rest }) => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery().get("search");

  return (
    <Route
      {...rest}
      render={(props) =>
        query ? (
          <>
            <BottomTabs />
            <Component {...props} query={query} />
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export const GoHomeIfLogged = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isRedirect, setIsRedirect] = React.useState(true);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isRedirect ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} setIsRedirect={setIsRedirect} />
        )
      }
    />
  );
};

export const routes = [
  {
    path: "/feed/subscriptions",
    component: () => <Subscriptions />,
  },
  {
    path: "/feed/channels",
    component: () => <ChannelList />,
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
