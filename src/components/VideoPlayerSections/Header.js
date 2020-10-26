import React from "react";

import { NavLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
    marginLeft: theme.spacing(2),
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

          <IconButton
            aria-haspopup="true"
            onClick={handleOpenMenu}
            className={classes.account}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
