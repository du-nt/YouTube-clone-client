import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "@material-ui/core/Link";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from '@material-ui/core';
import { toggleDrawer } from '../../../slices/drawerSlice';

import Search from './Search'
import AuthMenus from './AuthMenus';
import GuestMenus from './GuestMenus';
import SmallSideBar from './SmallSideBar';
import BigSideBar from './BigSideBar';
import TemporarySideBar from './TemporarySideBar';

const logoUrl =
  "url(https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg)";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#4a4a4a',
    backgroundColor: '#fff',
  },
  toolbar1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: 92,
    height: 25,
    backgroundImage: logoUrl,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPosition: "center",
  },
  menuButton: {
    marginRight: 16,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
  },
  drawerClose: {
    overflowX: 'hidden',
    width: theme.spacing(9) + 1,

  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));

export default function DesktopHeader() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tempOpen, setTempOpen] = useState(false);
  const matches = useMediaQuery('(min-width:1280px)');
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const { path } = useRouteMatch();

  const isVideoRoute = path === '/watch/:videoId'

  const openClasses = isOpen && matches

  const handleDrawerOpen = () => {
    if (isVideoRoute) {
      setTempOpen(true);
    }
    else if (matches) {
      dispatch(toggleDrawer());
    } else {
      dispatch(toggleDrawer(true));
      setTempOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setTempOpen(false);
  };

  useEffect(() => {
    setTempOpen(false);
  }, [matches])

  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="default"
        elevation={1}
      >
        <Toolbar className={classes.toolbar1}>
          <div className={classes.menuWrapper}>
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" component={NavLink}>
              <div className={classes.logo}></div>
            </Link>
          </div>

          <Search />

          <div className={classes.sectionDesktop}>
            {isAuthenticated ? <AuthMenus user={user} /> : <GuestMenus />}
          </div>

        </Toolbar>
      </AppBar>

      {!isVideoRoute && <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !openClasses,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !openClasses,
          }),
        }}
      >
        <div className={classes.toolbar}>
        </div>
        <Divider />
        <div>
          {matches && isOpen ?
            <BigSideBar />
            :
            <SmallSideBar />
          }
        </div>
      </Drawer>
      }

      {(!matches || isVideoRoute) && <TemporarySideBar open={tempOpen} handleDrawerClose={handleDrawerClose} />}
    </>
  );
}
