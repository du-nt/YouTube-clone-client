import React from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";

const logoUrl =
  "url(https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg)";

const useStyles = makeStyles((theme) => ({
  appbar: {
    color: "#3f51b5",
    backgroundColor: "white",
    height: 51,
  },
  tollbar: {
    paddingLeft: theme.spacing(2),
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
    backgroundImage: logoUrl,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPosition: "center",
  },
  cursor: {
    cursor: "pointer",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: "#00579c",
    fontSize: 12,
  },
}));

export default function Header({ openSearch, openMenu }) {
  const classes = useStyles();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleOpen = () => {
    openSearch();
  };

  const handleOpenMenu = () => {
    openMenu();
  };

  return (
    <AppBar
      position="static"
      variant="outlined"
      color="default"
      className={classes.appbar}
    >
      <Toolbar disableGutters className={classes.tollbar}>
        <Link to="/" component={NavLink}>
          <div className={classes.logo}></div>
        </Link>
        <div className={classes.right}>
          <SearchIcon className={classes.cursor} onClick={handleOpen} />
          {isAuthenticated ? (
            <IconButton className={classes.account} onClick={handleOpenMenu}>
              <Avatar alt="avatar" src={user.avatar} className={classes.small}>
                {user?.displayName.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          ) : (
            <IconButton
              aria-haspopup="true"
              onClick={handleOpenMenu}
              className={classes.account}
            >
              <AccountCircleIcon />
            </IconButton>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
