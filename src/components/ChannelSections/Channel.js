import React, { useState, useEffect } from "react";

import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import TopBar from "./TopBar";
import Modal from "./Modal";
import Videos from "./Videos";
import BannerInfo from "./BannerInfo";
import Dead from "./ Dead";

import {
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getProfile } from "../../slices/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
  },
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
  const [loading, setLoading] = useState(true);
  const [isDead, setIsDead] = useState(false);
  const { channelName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getProfile(channelName, setLoading, setIsDead));
  }, [channelName, dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isDead) return <Dead />;

  if (loading)
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );

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
