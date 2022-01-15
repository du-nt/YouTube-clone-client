import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  info: {
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
    WebkitLineClamp: "1",
    overflow: "hidden",
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

  const { avatar, displayName, _id, subscribersCount, videosCount } = user;
  const letterAvatar = displayName.charAt(0).toUpperCase();

  const match600 = useMediaQuery('(min-width:600px)');

  return (
    <Grid container spacing={2}>
      <Grid item xs={match600 ? 4 : 5}>
        <Grid
          container
          justify="center"
          component={NavLink}
          to={`/channel/${_id}`}
          className={classes.x}
        >
          <Avatar alt="avatar" src={avatar} className={classes.large}>
            {letterAvatar}
          </Avatar>
        </Grid>
      </Grid>
      <Grid item xs={match600 ? 8 : 7}>
        <Link
          component={NavLink}
          to={`/channel/${_id}`}
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
  );
}
