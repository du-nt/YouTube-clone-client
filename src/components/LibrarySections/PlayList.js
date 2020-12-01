import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 3, 0, 3),
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
    lineHeight: 1.4,
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
  media: {
    height: 0,
    paddingTop: "56%",
    position: "relative",
  },
}));

export default function PlayList({ videosCount, coverImage }) {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <CardMedia
            component={NavLink}
            to={`/`}
            className={classes.media}
            image={coverImage}
            title="poster"
          >
            <div className={classes.duration}>
              <Typography className={classes.count} variant="subtitle1">
                {videosCount}
              </Typography>
              <PlaylistPlayIcon className={classes.icon} />
            </div>
          </CardMedia>
        </Grid>
        <Grid item xs={6}>
          <Link component={NavLink} to="/" underline="none" color="inherit">
            <div className={classes.info}>
              <Typography className={classes.title} variant="subtitle1">
                Liked videos
              </Typography>
              <Typography variant="body2" className={classes.channel}>
                {user.displayName}
              </Typography>
              <Typography variant="body2" className={classes.gray}>
                {videosCount ? videosCount : "No"} videos
              </Typography>
            </div>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

PlayList.defaultProps = {
  videosCount: 0,
  coverImage:
    "https://www.bap-politischebildung.de/wp-content/plugins/borlabs-cookie/images/bct-no-thumbnail.png",
};
