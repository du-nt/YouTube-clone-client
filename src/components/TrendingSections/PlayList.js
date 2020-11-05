import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";

const url =
  "https://vcdn-ngoisao.vnecdn.net/2019/03/12/y-thien-do-long-ky-8903-1552359368.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 3, 0, 3),
  },
  cover: {
    position: "relative",
    height: "100%",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  info: {
    paddingLeft: theme.spacing(1),
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
  },
  channel: {
    color: "hsla(0,0%,6.7%, .6 )",
    lineHeight: "100%",
  },
  duration: {
    height: "100%",
    minWidth: 50,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "hsla(0,0%,6.7%, .8 )",
    color: "#eee",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 30,
  },
  count: {
    lineHeight: "normal",
  },
}));

export default function PlayList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={5}>
          <Link component={NavLink} to="/">
            <div className={classes.cover}>
              <img alt="poster" src={url} className={classes.img} />
              <div className={classes.duration}>
                <Typography className={classes.count} variant="subtitle1">
                  3
                </Typography>
                <PlaylistPlayIcon className={classes.icon} />
              </div>
            </div>
          </Link>
        </Grid>
        <Grid item xs={7}>
          <Link component={NavLink} to="/" underline="none" color="inherit">
            <div className={classes.info}>
              <Typography className={classes.title} variant="subtitle1">
                Playlist title
              </Typography>
              <Typography variant="body2" className={classes.channel}>
                Dua Leo
              </Typography>
              <Typography variant="caption" className={classes.gray}>
                100 videos
              </Typography>
            </div>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
