import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 12,
    padding: theme.spacing(0, 6, 0, 2),
    display: "flex",
    alignItems: "center",
  },
  info: {
    padding: theme.spacing(0, 1),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    wordBreak: "break-word",
    lineHeight: "normal",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
    fontSize: "1.1rem",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: "#00579c",
    textDecoration: "none",
    fontSize: 30,
  },
  x: {
    textDecoration: "none",
  },
  gray: {
    color: "hsla(0,0%,6.7%, .6 )",
  },
}));

export default function UserItem({ user }) {
  const classes = useStyles();

  const { avatar, displayName, userName, subscribersCount, videosCount } = user;
  const letterAvatar = displayName.charAt(0).toUpperCase();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <Grid
            container
            justify="center"
            component={NavLink}
            to={`/channel/${userName}`}
            className={classes.x}
          >
            <Avatar alt="avatar" src={avatar} className={classes.large}>
              {letterAvatar}
            </Avatar>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Link
            component={NavLink}
            to={`/channel/${userName}`}
            underline="none"
            color="inherit"
          >
            <div className={classes.info}>
              <Typography className={classes.title} variant="subtitle1">
                {displayName}
              </Typography>
              <Typography variant="body2" className={classes.gray}>
                {videosCount} videos
              </Typography>
              <Typography variant="body2" className={classes.gray}>
                {subscribersCount} subscribers
              </Typography>
            </div>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
