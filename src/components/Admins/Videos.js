import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CloseIcon from "@material-ui/icons/Close";

import { getVideos, deleteVideo } from "../../slices/admin";

const useStyles = makeStyles((theme) => ({
  root2: {
    margin: theme.spacing(0, 2),
    marginTop: 12,
    paddingLeft: theme.spacing(1.5),
    display: "flex",
    alignItems: "center",
  },
  info: {
    padding: theme.spacing(0, 1),
  },
  gray: {
    color: "hsla(0,0%,6.7%, .6 )",
    wordBreak: "break-word",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
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
  media: {
    height: 0,
    paddingTop: "58%",
    position: "relative",
  },
  loading: {
    marginTop: "30%",
    display: "flex",
    justifyContent: "center",
  },
  noVideos: {
    marginTop: "30%",
  },
}));

export default function Videos() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    dispatch(getVideos(setLoading, setVideos));
  }, [dispatch]);

  const handleDelete = (_id) => {
    dispatch(deleteVideo(_id, setVideos));
  };

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );

  return videos.length ? (
    videos.map(({ title, thumbnail, author, _id }, index) => (
      <div className={classes.root2} key={index}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={7}>
            <CardMedia
              className={classes.media}
              image={thumbnail}
              title="poster"
            />
          </Grid>
          <Grid item xs={5}>
            <div className={classes.info}>
              <Typography className={classes.title} variant="subtitle1">
                {title}
              </Typography>
              <Typography variant="body2" className={classes.gray}>
                {author.displayName}
              </Typography>
            </div>
          </Grid>
        </Grid>

        <IconButton color="secondary" onClick={() => handleDelete(_id)}>
          <CloseIcon />
        </IconButton>
        
      </div>
    ))
  ) : (
    <Typography
      align="center"
      color="textSecondary"
      className={classes.noVideos}
    >
      No video
    </Typography>
  );
}
