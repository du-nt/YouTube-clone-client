import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";

import { search } from "../../slices/userSlice";

import UserItem from "./UserItem";
import VideoItem from "./VideoItem";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    paddingBottom: 50,
  },
  loading: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
  },
}));

export default function Results({ query }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    dispatch(search(query, setVideos, setUsers, setLoading));
  }, [query, dispatch]);

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );

  return !videos.length && !users.length ? (
    <Typography className={classes.root} align="center" color="textSecondary">
      No results found
    </Typography>
  ) : (
    <div className={classes.root}>
      {users.map((user, index) => (
        <UserItem key={index} user={user} />
      ))}
      {videos.map((video, index) => (
        <VideoItem key={index} video={video} />
      ))}
    </div>
  );
}
