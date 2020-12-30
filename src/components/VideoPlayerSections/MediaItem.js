import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link, Typography } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 12,
    padding: theme.spacing(0, 1.5),
  },
  info: {
    padding: theme.spacing(0, 1),
    height: "100%",
  },
  gray: {
    color: "hsla(0,0%,6.7%, .6 )",
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
  channel: {
    color: "hsla(0,0%,6.7%, .6 )",
    lineHeight: "100%",
  },
  duration: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "hsla(0,0%,6.7%, .8 )",
    color: "#eee",
    padding: "1px 4px",
    fontSize: 13,
    borderRadius: 2,
  },
  media: {
    height: 0,
    paddingTop: "53%",
    position: "relative",
  },
}));

export default function MediaItem({ video }) {
  const classes = useStyles();
  const { _id, thumbnail, duration, title, author, views } = video;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <CardMedia
            component={NavLink}
            to={`/watch/${_id}`}
            className={classes.media}
            image={thumbnail}
            title="poster"
          >
            <Typography className={classes.duration}>{duration}</Typography>
          </CardMedia>
        </Grid>
        <Grid item xs={6}>
          <Link
            component={NavLink}
            to={`/watch/${_id}`}
            underline="none"
            color="inherit"
          >
            <div className={classes.info}>
              <Typography className={classes.title} variant="subtitle1">
                {title}
              </Typography>
              <Typography variant="body2" className={classes.channel}>
                {author.displayName}
              </Typography>
              <Typography variant="body2" className={classes.gray}>
                {views} views
              </Typography>
            </div>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
