import React from "react";
import { Link, Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default function Private() {
  return (
    <Container maxWidth="md">
      <Typography variant="h5">XXX channel page</Typography>
      <Link component={NavLink} to="/">
        Go home
      </Link>
    </Container>
  );
}
