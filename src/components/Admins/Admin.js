import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import {
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import BlankHeader from "./BlankHeader";
import Users from "./Users";
import Videos from "./Videos";

const useStyles = makeStyles((theme) => ({
  tabspart: {
    display: "flex",
    borderTop: "none",
  },
  tabs: {
    flex: 1,
  },
}));

export default function Admin() {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <>
      <BlankHeader />

      <Paper variant="outlined" square className={classes.tabspart}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={pathname}
          variant="fullWidth"
          className={classes.tabs}
        >
          <Tab
            label="Users"
            value={`${url}/users`}
            component={NavLink}
            to={`${url}/users`}
          />
          <Tab
            label="Videos"
            value={`${url}/videos`}
            component={NavLink}
            to={`${url}/videos`}
          />
        </Tabs>
      </Paper>

      <Switch>
        <Route path={`${path}/users`}>
          <Users />
        </Route>
        <Route path={`${path}/videos`}>
          <Videos />
        </Route>
      </Switch>
    </>
  );
}
