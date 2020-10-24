import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: theme.spacing(5, 10),
    marginBottom: theme.spacing(3),
  },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography variant="h5" className={classes.z}>
        My profile
      </Typography>
    </Container>
  );
}
