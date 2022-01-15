import React, { useState, useEffect } from "react";

import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@material-ui/icons/Search';

import TopBar from "./TopBar";
import Modal from "./Modal";
import Videos from "./Videos";
import BannerInfo from "./BannerInfo";
import Dead from "./ Dead";
import DesktopBanner from "./DesktopBanner";

import {
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import { Typography, useMediaQuery } from "@material-ui/core";
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
    [theme.breakpoints.up("md")]: {
      border: 'none',
      display: 'block',
    }
  },
  tabs: {
    flex: 1,
  },
  not: {
    marginTop: "30%",
    [theme.breakpoints.up("md")]: {
      marginTop: "10%",
    }
  },
  search: {
    borderRadius: "50%",
    minWidth: theme.spacing(6)
  },
  tab: {
    [theme.breakpoints.up("md")]: {
      minWidth: 122,
    },
    [theme.breakpoints.up("1180")]: {
      minWidth: 160,
    },
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

  const matches = useMediaQuery('(min-width:960px)');

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

  const desktopTabs = [
    {
      label: 'Community',
      path: `${url}/community`,
    },
    {
      label: 'Channels',
      path: `${url}/channels`,
    },
    {
      label: 'About',
      path: `${url}/about`,
    },
    {
      icon: <SearchIcon />
    }
  ]

  if (isDead) return <Dead />;

  if (loading)
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );

  return (
    <>
      {!matches && <TopBar />}
      {matches ? <DesktopBanner /> : <BannerInfo />}
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={11} lg={10} xl={7}>
          <Paper variant="outlined" square className={classes.tabspart}>
            <div className={classes.tabs}>
              <Tabs
                value={pathname}
                scrollButtons="auto"
                variant={matches ? 'scrollable' : 'fullWidth'}
              >
                <Tab
                  label="Home"
                  value={url}
                  component={NavLink}
                  to={`${url}`}
                  className={classes.tab}
                />
                <Tab
                  label="Videos"
                  value={`${url}/videos`}
                  component={NavLink}
                  to={`${url}/videos`}
                  className={classes.tab}
                />
                <Tab
                  label="Playlists"
                  value={`${url}/playlists`}
                  component={NavLink}
                  to={`${url}/playlists`}
                  className={classes.tab}
                />
                {matches &&
                  desktopTabs.map((tab, idx) =>
                    tab.icon ?
                      <Tab
                        className={classes.search}
                        key={idx}
                        icon={tab.icon}
                      /> :
                      <Tab
                        key={idx}
                        label={tab.label}
                        value={tab.path}
                        component={NavLink}
                        to={tab.path}
                        className={classes.tab}
                      />)
                }
              </Tabs>
            </div>

            {!matches && <IconButton onClick={handleOpen}>
              <ExpandMoreIcon />
            </IconButton>
            }
          </Paper>


          <Switch>
            <Route path={path} exact>
              <Videos />
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
            {
              matches &&
              desktopTabs.map((tab, idx) =>
                <Route path={tab.path} key={idx}>
                  <Typography
                    align="center"
                    color="textSecondary"
                    className={classes.not}
                  >
                    Not yet implemented
                  </Typography>
                </Route>
              )
            }
          </Switch>

        </Grid>
      </Grid>

      {open && <Modal open={open} handleClose={handleClose} />}
    </>
  );
}
