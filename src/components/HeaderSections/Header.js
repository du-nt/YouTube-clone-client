import React, { useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import { logout } from "../../slices/authSlice";

const logoUrl =
  "url(https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg)";

const useStyles = makeStyles((theme) => ({
  appbar: {
    color: "#3f51b5",
    backgroundColor: "white",
    height: 51,
  },
  tollbar: {
    minHeight: 51,
    height: "100%",
  },
  right: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  },
  account: {
    marginLeft: 18,
  },
  logo: {
    width: 92,
    height: 25,
    marginLeft: 10,
    backgroundImage: logoUrl,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPosition: "center",
  },
}));

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleLogOut = () => {
    dispatch(logout(history));
  };

  const AuthButtons = (
    <div className={classes.authsButtons}>
      <Button
        component={NavLink}
        to={{ pathname: "/login", state: { from: location.pathname } }}
        color="primary"
        variant="contained"
        className={classes.button}
      >
        Login
      </Button>
      <Button
        component={NavLink}
        to={{ pathname: "/register", state: { from: location.pathname } }}
        color="primary"
        className={classes.button}
      >
        Register
      </Button>
    </div>
  );

  return (
    <AppBar
      position="sticky"
      variant="outlined"
      color="default"
      className={classes.appbar}
    >
      <Toolbar disableGutters className={classes.tollbar}>
        <Link to="/" component={NavLink}>
          <div className={classes.logo}></div>
        </Link>
        <div className={classes.right}>
          <SearchIcon />
          <IconButton
            aria-haspopup="true"
            // onClick={handleMobileMenuOpen}
            color="inherit"
            className={classes.account}
          >
            <AccountCircleIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
