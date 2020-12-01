import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";

import Video from "./Video";

import { getChannelVideos } from "../../slices/userSlice";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 50,
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
  const { _id } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getChannelVideos(_id, setVideos, setLoading));
  }, [dispatch, _id]);

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );

  return videos.length ? (
    <div className={classes.root}>
      {videos.map((video, index) => (
        <Video key={index} video={video} />
      ))}
    </div>
  ) : (
    <Typography
      align="center"
      color="textSecondary"
      className={classes.noVideos}
    >
      This channel has no videos
    </Typography>
  );
}
