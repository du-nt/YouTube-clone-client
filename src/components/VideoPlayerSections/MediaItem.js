import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const url =
  "https://vcdn-ngoisao.vnecdn.net/2019/03/12/y-thien-do-long-ky-8903-1552359368.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 8,
    padding: theme.spacing(0, 1.5),
  },
  cover: {
    position: "relative",
    height: "100%",
  },
  img: {
    width: "100%",
    objectFit: "cover",
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
  },
  channel: {
    color: "hsla(0,0%,6.7%, .6 )",
    lineHeight: "100%",
  },
  duration: {
    position: "absolute",
    right: 5,
    bottom: 10,
    backgroundColor: "hsla(0,0%,6.7%, .8 )",
    color: "#eee",
    padding: "1px 4px",
    fontSize: 13,
    borderRadius: 2,
  },
}));

export default function MediaItem() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={5}>
        <Link component={NavLink} to="/">
          <div className={classes.cover}>
            <img alt="poster" src={url} className={classes.img} />
            <div className={classes.duration}>21:36</div>
          </div>
        </Link>
      </Grid>
      <Grid item xs={7}>
        <Link component={NavLink} to="/" underline="none" color="inherit">
          <div className={classes.info}>
            <Typography className={classes.title} variant="subtitle1">
              dfasddddddddddddddddaaaaaaaad
            </Typography>
            <Typography variant="body2" className={classes.channel}>
              Dua Leo
            </Typography>
            <Typography variant="caption" className={classes.gray}>
              100K views
            </Typography>
          </div>
        </Link>
      </Grid>
    </Grid>
  );
}
