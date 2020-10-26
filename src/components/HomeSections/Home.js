import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import TopBar from "./TopBar";

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
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Typography variant="h1" className={classes.x}>
        Homepage
      </Typography>
      <Link component={NavLink} to="xxx">
        sign in
      </Link>
    </>
  );
}
