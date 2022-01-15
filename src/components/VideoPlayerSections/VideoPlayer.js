import React, { useRef, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import TopBar from "./TopBar";
import Video from "./Video";
import ActionBar from "./ActionBar";
import UpNext from "./UpNext";
import DesktopActionButtons from './DesktopActionButtons'
import Comments from "./Comments";

import { getVideo } from "../../slices/videoSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid'

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

  const matches = useMediaQuery('(min-width:960px)');
  const match1500 = useMediaQuery('(min-width:1500px)');

  useEffect(() => {
    setLoading(true);
    dispatch(getVideo(videoId, setDead, setLoading));
  }, [dispatch, videoId]);

  useEffect(() => {
    if (!loading) {
      const height = divRef.current.offsetHeight + 1;
      setPlayerHeight(height);
    }
    return () => setPlayerHeight(null);
  }, [loading, matches]);

  if (dead)
    return (
      <>
        {!matches && <TopBar />}
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
        {!matches && <TopBar />}
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      </>
    );

  return (
    <>
      {matches ?
        <div ref={divRef}>
          <Grid container justify="center" >
            <Grid item md={12} lg={11} xl={8}>
              <Grid container justify="center" spacing={3}>
                <Grid item xs={match1500 ? 9 : 8}>
                  <Video />
                  <DesktopActionButtons />
                  <Comments />
                </Grid>
                <Grid item xs={match1500 ? 3 : 4}>
                  <UpNext />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </div> :
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
      }
    </>
  );
}
