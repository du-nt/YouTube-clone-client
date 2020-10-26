import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import TopBar from "./TopBar";
import Video from "./Video";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <TopBar />
      <Video />
    </>
  );
}
