import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import TopBar from "./TopBar";
import VideoItem from "./VideoItem";
import { useDispatch } from "react-redux";

import { getVideos } from "../../slices/videoSlice";

const useStyles = makeStyles((theme) => ({
  rootClass: {
    paddingBottom: 50,
  },
  root: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    dispatch(getVideos(setVideos, setLoading));
  }, [dispatch]);

  return (
    <div className={classes.rootClass}>
      <TopBar />
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : videos.length ? (
        // videos.map((video, index) => <VideoItem key={index} video={video} />)
        <div>home</div>
      ) : (
        <Typography color="textSecondary" className={classes.root}>
          Nothing to watch
        </Typography>
      )}
    </div>
  );
}
