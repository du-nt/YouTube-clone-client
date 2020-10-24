import React from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" className={classes.x}>
        Homepage
      </Typography>
      <Link variant="h5" component={NavLink} to="/private">
        Go to private
      </Link>
    </Container>
  );
}
