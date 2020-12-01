import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40vh",
  },
}));

export default function Dead() {
  const classes = useStyles();
  return (
    <Typography
      align="center"
      variant="h5"
      color="textSecondary"
      className={classes.root}
    >
      Sorry, this channel isn't available.
    </Typography>
  );
}
