import React from "react";

import { NavLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TuneIcon from "@material-ui/icons/Tune";
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
    marginLeft: "auto",
  },
  logo: {
    width: 30,
    height: 24,
    backgroundImage: logoUrl,
    backgroundRepeat: "no-repeat",
    backgroundSize: "306%",
    backgroundPosition: "left",
  },
  middle: {
    flex: 1,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5, 1.6),
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "hsla(0,0%,93.3%, .6 )",
    color: "hsla(0,0%,6.7%, .6 )",
    cursor: "pointer",
  },
  text: {
    color: "#111",
  },
}));

export default function Header({ openSearch, openMenu, query }) {
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
        <div className={classes.middle} onClick={handleOpen}>
          <Typography className={classes.text}>{query}</Typography>
          <TuneIcon />
        </div>
        <IconButton className={classes.right} onClick={handleOpenMenu}>
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
