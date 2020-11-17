import React from "react";

import { NavLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { Typography } from "@material-ui/core";

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
    display: "flex",
    alignItems: "center",
  },
  right: {
    flex: 1,
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 30,
    height: 24,
    backgroundImage: logoUrl,
    backgroundRepeat: "no-repeat",
    backgroundSize: "306%",
    backgroundPosition: "left",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: "#00579c",
    fontSize: 12,
  },
  notSignIn: {
    flex: 1,
    alignSelf: "flex-start",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btn: {
    marginRight: theme.spacing(2),
  },
  channel: {
    paddingLeft: 13,
    fontWeight: 500,
    color: "#111",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
    lineHeight: "normal",
    wordBreak: "break-word",
  },
}));

export default function Header({ openSearch, openMenu }) {
  const classes = useStyles();

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
        <Typography className={classes.channel} variant="subtitle1">
          SofM
        </Typography>
        <div className={classes.right}>
          <IconButton onClick={handleOpen}>
            <SearchIcon />
          </IconButton>
          <IconButton onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
