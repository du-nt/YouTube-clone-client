import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import TopBar from "../HomeSections/TopBar";
import NotLog from "./NotLog";
import Log from "./Log";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
});

export default function Library() {
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className={classes.root}>
      <TopBar />
      {isAuthenticated ? <Log /> : <NotLog />}
    </div>
  );
}
