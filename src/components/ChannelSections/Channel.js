import React, { useState } from "react";

import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";

import TopBar from "./TopBar";
import Modal from "./Modal";
import Videos from "./Videos";
import BannerInfo from "./BannerInfo";

import {
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tabspart: {
    display: "flex",
    borderTop: "none",
  },
  tabs: {
    flex: 1,
  },
  not: {
    marginTop: theme.spacing(8),
  },
}));

export default function Channel() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { path, url } = useRouteMatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TopBar />
      <BannerInfo />
      <Paper variant="outlined" square className={classes.tabspart}>
        <Tabs value={pathname} variant="fullWidth" className={classes.tabs}>
          <Tab label="Home" value={url} component={NavLink} to={`${url}`} />
          <Tab
            label="Videos"
            value={`${url}/videos`}
            component={NavLink}
            to={`${url}/videos`}
          />
          <Tab
            label="Playlists"
            value={`${url}/playlists`}
            component={NavLink}
            to={`${url}/playlists`}
          />
        </Tabs>
        <IconButton onClick={handleOpen}>
          <ExpandMoreIcon />
        </IconButton>
      </Paper>

      <Switch>
        <Route path={path} exact>
          <Typography
            align="center"
            color="textSecondary"
            className={classes.not}
          >
            Not yet implemented
          </Typography>
        </Route>
        <Route path={`${path}/videos`}>
          <Videos />
        </Route>
        <Route path={`${path}/playlists`}>
          <Typography
            align="center"
            color="textSecondary"
            className={classes.not}
          >
            Not yet implemented
          </Typography>
        </Route>
      </Switch>

      {open && <Modal open={open} handleClose={handleClose} />}
    </>
  );
}
