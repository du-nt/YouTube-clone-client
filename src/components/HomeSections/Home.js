import React from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import BottomTabs from "./BottomTabs";
import Header from "../HeaderSections/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh"
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" disableGutters className={classes.root}>
      <Header />
      <Typography variant="h4" className={classes.x}>
        Homepage
      </Typography>
      <BottomTabs />
    </Container>
  );
}
