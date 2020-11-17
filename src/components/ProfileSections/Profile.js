import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

import BlankHeader from "./BlankHeader";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    maxHeight: 66,
    objectFit: "cover",
    objectPosition: "center",
  },
  parent: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "red",
    zIndex: 100,
  },
}));

export default function Profile() {
  const classes = useStyles();
  const url =
    "https://media.istockphoto.com/vectors/vector-line-art-seashells-abtract-seamless-pattern-vector-id475508162";

  return (
    <>
      <BlankHeader />
      <div className={classes.parent}>
        <img alt="cover" src={url} className={classes.img} />
        <IconButton className={classes.icon}>
          <CameraAltIcon />
        </IconButton>
      </div>
    </>
  );
}
