import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import VideoItem from "./VideoItem";
import ListView from "./ListView";
import SubscribedBar from "./SubscribedBar";
import Manage from "./Manage";

import { getSubscriptionVideos } from "../../slices/videoSlice";

const useStyles = makeStyles((theme) => ({
  rootClass: {
    paddingBottom: 50,
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
    },
  },
  root: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
  },
  noVideos: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
  marginTop: {
    marginTop: 300
  },
  fixSpacing: {
    width: "100%",
    margin: 0
  }
}));

export default function Subscriptions() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [isGrid, setIsGrid] = useState(true)
  const [sixSubscribedUsers, setSixSubscribedUsers] = useState([]);
  const matches = useMediaQuery("(min-width:960px)");
  const match600 = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    dispatch(
      getSubscriptionVideos(setVideos, setSixSubscribedUsers, setLoading)
    );
  }, [dispatch]);

  return (
    <div className={classes.rootClass}>
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : videos.length ? (
        <>
          <Grid container justify="center">
            <Grid item xs={12} lg={10} xl={8}>

              {!matches ?
                <SubscribedBar users={sixSubscribedUsers} />
                : <Manage isGrid={isGrid} setIsGrid={setIsGrid} />}

              <Grid container spacing={match600 ? 0 : 3} classes={{ 'spacing-xs-3': classes.fixSpacing }} >
                {videos.map((video, index) =>
                  !isGrid && matches ?
                    <Grid key={index} item xs={12}>
                      <ListView video={video} />
                    </Grid>
                    :
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <VideoItem video={video} />
                    </Grid>
                )
                }
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : sixSubscribedUsers.length ? (
        <>
          {!matches && <SubscribedBar users={sixSubscribedUsers} />}
          <Typography
            align="center"
            color="textSecondary"
            className={matches ? classes.marginTop : classes.noVideos}
          >
            Your subscriptions haven't uploaded any videos yet. Try finding
            another channel to subscribe to.
          </Typography>
        </>
      ) : (
        <Typography
          align="center"
          color="textSecondary"
          className={matches ? classes.marginTop : classes.noVideos}
        >
          Subscribe to get the latest videos from channels you love.
        </Typography>
      )}
    </div>
  );
}
