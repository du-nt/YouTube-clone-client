import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';

import TopBar from "../HomeSections/TopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40%",
    fontWeight: 400,
    [theme.breakpoints.up('lg')]: {
      marginTop: "20%",
    },
  },
}));

function Trending() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:960px)");
  return (
    <>
      {!matches && <TopBar />}
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
