import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

import TopBar from "./TopBar";
import VideoItem from "./VideoItem";

import { getVideos } from "../../slices/videoSlice";

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
  fixSpacing: {
    width: "100%",
    margin: 0
  },
  infoWrapper: {
    display: "flex",
    padding: '12px 0 18px 12px',
    [theme.breakpoints.up('md')]: {
      padding: '12px 0 18px 0',
    }
  },
  infoSkeleton: {
    flexGrow: 1,
  },
  avatarSkeleton: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1)
  }
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const matches = useMediaQuery("(min-width:960px)");
  const match600 = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    dispatch(getVideos(setVideos, setLoading));
  }, [dispatch]);

  return (
    <div className={classes.rootClass}>
      {!matches && <TopBar />}

      {loading ?
        <Grid container spacing={match600 ? 0 : 3} classes={{ 'spacing-xs-3': classes.fixSpacing }} >
          {Array.from(new Array(30)).map((item, index) =>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
              <Skeleton variant="rect" height={170} />

              <div className={classes.infoWrapper} >
                <div className={classes.avatarSkeleton} >
                  <Skeleton variant="circle" width={40} height={40} />
                </div>
                <div className={classes.infoSkeleton} >
                  <Skeleton width='90%' height={32} />
                  <Skeleton width='60%' height={32} />
                </div>
              </div>

            </Grid>)
          }
        </Grid>
        :
        videos.length ?
          <Grid container spacing={match600 ? 0 : 3} classes={{ 'spacing-xs-3': classes.fixSpacing }} >
            {videos.map((video, index) =>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                <VideoItem video={video} />
              </Grid>)
            }
          </Grid>
          :
          <Typography color="textSecondary" className={classes.root}>
            Nothing to watch
          </Typography>
      }
    </div>
  );
}
