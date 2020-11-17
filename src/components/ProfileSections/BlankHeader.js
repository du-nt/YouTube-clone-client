import React from "react";

import { NavLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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
  },
  logo: {
    width: 30,
    height: 24,
    backgroundImage: logoUrl,
    backgroundRepeat: "no-repeat",
    backgroundSize: "306%",
    backgroundPosition: "left",
  },
  channel: {
    paddingLeft: 13,
    fontWeight: 500,
    color: "#111",
  },
}));

export default function BlankHeader() {
  const classes = useStyles();

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
        <Typography className={classes.channel} variant="h6">
          Channel settings
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
