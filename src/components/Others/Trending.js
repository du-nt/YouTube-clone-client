import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import TopBar from "../HomeSections/TopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40%",
    fontWeight: 400,
  },
}));

function Trending() {
  const classes = useStyles();
  return (
    <>
      <TopBar />
      <Typography
        className={classes.root}
        align="center"
        variant="h6"
        color="textSecondary"
      >
        This feature is not yet implemented
      </Typography>
    </>
  );
}

export default Trending;
