import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 2,
  },
  tab: {
    textTransform: "capitalize",
    fontSize: "0.7rem",
    padding: 0,
    minHeight: 48,
    paddingTop: 5,
  },
  icon: {
    "& > *": { margin: "0 !important" },
  },
  indicator: {
    height: 0,
    width: 0,
  },
  hidden: {
    display: "none",
  },
});

export default function BottomTabs() {
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { path } = useRouteMatch();

  return (
    <Paper square variant="outlined" className={classes.root}>
      <Tabs
        value={path}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        classes={{ indicator: classes.indicator }}
      >
        <Tab
          value="/"
          classes={{ root: classes.tab, wrapper: classes.icon }}
          icon={<HomeIcon />}
          label="Home"
          component={NavLink}
          to="/"
        />
        <Tab
          value="/feed/trending"
          classes={{ root: classes.tab, wrapper: classes.icon }}
          icon={<WhatshotIcon />}
          label="Trending"
          component={NavLink}
          to="/feed/trending"
        />
        {isAuthenticated && (
          <Tab
            value="/feed/subscriptions"
            classes={{ root: classes.tab, wrapper: classes.icon }}
            icon={<SubscriptionsIcon />}
            label="Subscriptions"
            component={NavLink}
            to="/feed/subscriptions"
          />
        )}
        <Tab
          value="/feed/library"
          classes={{ root: classes.tab, wrapper: classes.icon }}
          icon={<VideoLibraryIcon />}
          label="Library"
          component={NavLink}
          to="/feed/library"
        />
        <Tab
          disabled
          classes={{ root: classes.hidden }}
          value="/channel/:channelName"
        />
        <Tab
          disabled
          classes={{ root: classes.hidden }}
          value="/feed/channels"
        />
        <Tab disabled classes={{ root: classes.hidden }} value="/results" />
      </Tabs>
    </Paper>
  );
}
