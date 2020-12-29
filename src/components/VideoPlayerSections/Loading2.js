import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  info: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  avatar: {
    marginTop: 4,
    width: theme.spacing(3.3),
    height: theme.spacing(3.3),
  },
  skeleton: {
    marginTop: theme.spacing(0.5),
  },
}));

export default function Loading2() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton variant="circle" className={classes.avatar}>
        <Avatar />
      </Skeleton>
      <div className={classes.info}>
        <Typography>
          <Skeleton height={15} width="80%" />
        </Typography>
        <Typography>
          <Skeleton height={15} width="60%" />
        </Typography>
        <Skeleton
          variant="rect"
          height={40}
          width="40%"
          className={classes.skeleton}
        />
      </div>
    </div>
  );
}
