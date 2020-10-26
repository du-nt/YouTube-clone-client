import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  overlay: {
    zIndex: 3,
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    cursor: "pointer",
    backgroundColor: "hsla(0,0%,6.7%, .8 )",
  },
});

export default function Overlay({ closeSearch }) {
  const classes = useStyles();

  return <div className={classes.overlay} onClick={() => closeSearch()}></div>;
}
