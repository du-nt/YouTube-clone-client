import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import TopBar from "../HomeSections/TopBar";
import VideoItem from "./VideoItem";
import SubscribedBar from "./SubscribedBar";

import { getSubscriptionVideos } from "../../slices/videoSlice";

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
  noVideos: {
    width: "100%",
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
}));

export default function Subscriptions() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [sixSubscribedUsers, setSixSubscribedUsers] = useState([]);

  useEffect(() => {
    dispatch(
      getSubscriptionVideos(setVideos, setSixSubscribedUsers, setLoading)
    );
  }, [dispatch]);

  return (
    <div className={classes.rootClass}>
      <TopBar />
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : videos.length ? (
        <>
          <SubscribedBar users={sixSubscribedUsers} />
          {videos.map((video, index) => (
            <VideoItem key={index} video={video} />
          ))}
        </>
      ) : sixSubscribedUsers.length ? (
        <>
          <SubscribedBar users={sixSubscribedUsers} />
          <Typography
            align="center"
            color="textSecondary"
            className={classes.noVideos}
          >
            Your subscriptions haven't uploaded any videos yet. Try finding
            another channel to subscribe to.
          </Typography>
        </>
      ) : (
        <Typography
          align="center"
          color="textSecondary"
          className={classes.noVideos}
        >
          Subscribe to get the latest videos from channels you love.
        </Typography>
      )}
    </div>
  );
}
