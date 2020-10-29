import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import TopBar from "./TopBar";
import Video from "./Video";
import ActionBar from "./ActionBar";
import UpNext from "./UpNext";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh",
  },
  sticky: {
    position: "sticky",
    top: 0,
    zIndex: 200,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.sticky}>
        <TopBar />
        <Video />
      </div>
      <ActionBar />
      <UpNext />
    </>
  );
}
