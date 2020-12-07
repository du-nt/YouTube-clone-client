import React, { useRef, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import TopBar from "./TopBar";
import Video from "./Video";
import ActionBar from "./ActionBar";
import UpNext from "./UpNext";

import { getVideo } from "../../slices/videoSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh",
  },
  sticky: {
    position: "sticky",
    top: 0,
    zIndex: 200,
  },
  text: {
    marginTop: theme.spacing(2),
  },
  loading: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [playerHeight, setPlayerHeight] = useState(null);
  const divRef = useRef(null);
  const [dead, setDead] = useState(false);
  const [loading, setLoading] = useState(true);

  const { videoId } = useParams();

  useEffect(() => {
    setLoading(true);
    dispatch(getVideo(videoId, setDead, setLoading));
  }, [dispatch, videoId]);

  useEffect(() => {
    if (!loading) {
      const height = divRef.current.offsetHeight + 1;
      setPlayerHeight(height);
    }
  }, [loading]);

  if (dead)
    return (
      <>
        <TopBar />
        <Typography
          color="textSecondary"
          align="center"
          className={classes.text}
        >
          Oops! Something went wrong.
        </Typography>
      </>
    );

  if (loading)
    return (
      <>
        <TopBar />
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      </>
    );

  return (
    <>
      <div ref={divRef} className={classes.sticky}>
        <TopBar />
        {!loading && <Video />}
      </div>
      {!loading && (
        <>
          <ActionBar playerHeight={playerHeight} />
          <UpNext />
        </>
      )}
    </>
  );
}
