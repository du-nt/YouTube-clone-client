import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CardMedia from "@material-ui/core/CardMedia";
import { NavLink, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e7e7e7",
    flex: 1,
  },
  fist: {
    backgroundColor: "#eee",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.7, 1.2),
  },
  second: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  btn: {
    textTransform: "none",
  },
  img: {
    width: "90%",
  },
  icon: {
    fontSize: 42,
    marginRight: 5,
    color: "#727dbb",
  },
  body: {
    margin: theme.spacing(1, 0, 3, 0),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function NotLog() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <div className={classes.fist}>
        <AccountCircleIcon className={classes.icon} />
        <Typography>Sign in</Typography>
      </div>
      <CardMedia
        className={classes.media}
        image="https://m.youtube.com/static/sign_in_promo.png"
        title="sign"
      />
      <div className={classes.second}>
        <Typography variant="h5">You're not signed in</Typography>
        <Typography
          variant="body2"
          color="textPrimary"
          className={classes.body}
        >
          Sign in now to upload, save, and comment on videos
        </Typography>
        <Button
          component={NavLink}
          to={{ pathname: "/login", state: { from: location.pathname } }}
          variant="contained"
          color="primary"
          className={classes.btn}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
