import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

import Video from "./Video";
import DesktopVideo from "./DesktopVideo";

import { getChannelVideos } from "../../slices/userSlice";
import { Typography, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 50,
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
      marginTop: theme.spacing(2)
    }
  },
  loading: {
    marginTop: "30%",
    display: "flex",
    justifyContent: "center",
  },
  noVideos: {
    marginTop: "30%",
    [theme.breakpoints.up("md")]: {
      marginTop: "10%",
    }
  },
}));

export default function Videos() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const { _id } = useSelector((state) => state.user);
  const matches = useMediaQuery('(min-width:960px)');

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
      <Grid container spacing={matches ? 1 : 0}>
        {videos.map((video, index) => (
          matches ?
            <Grid item key={index} md={4} lg={3}>
              <DesktopVideo video={video} />
            </Grid>
            :
            <Grid item key={index} xs={12}>
              <Video video={video} />
            </Grid>
        ))}
      </Grid>
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
