import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 12,
    padding: theme.spacing(0, 1.5),
  },
  info: {
    padding: theme.spacing(0, 1),
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "53%",
  },
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <Skeleton variant="rect" width="100%">
            <div className={classes.media} />
          </Skeleton>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.info}>
            <Typography variant="subtitle1">
              <Skeleton width="100%" height={20} />
            </Typography>
            <Typography variant="body2">
              <Skeleton width="60%" height={13} />
            </Typography>
            <Typography variant="body2">
              <Skeleton width="50%" height={13} />
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
