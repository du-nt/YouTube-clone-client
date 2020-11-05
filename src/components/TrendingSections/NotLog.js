import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
      <div className={classes.second}>
        <img
          alt="sign"
          className={classes.img}
          src="https://m.youtube.com/static/sign_in_promo.png"
        />
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
