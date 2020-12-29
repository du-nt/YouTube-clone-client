import React, { useEffect, useState, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";

import MediaItem from "./MediaItem";
import Loading from "./Loading";

import { getRelatedVideos } from "../../slices/videoSlice";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderTopWidth: "2px",
    borderBottom: "none",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(0.5, 1.5),
  },
  recommend: {
    marginTop: "-8px",
  },
  text: {
    marginTop: theme.spacing(2),
  },
}));

export default function UpNext() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const { videoId } = useParams();
  const unmounted = useRef(false);
 
  useEffect(() => {
    dispatch(
      getRelatedVideos(videoId, setVideos, setLoading, unmounted.current)
    );
    return () => {
      unmounted.current = true;
    };
  }, [dispatch, videoId]);

  return (
    <Paper variant="outlined" square className={classes.paper}>
      <div className={classes.header}>
        <Typography variant="body2">Up next</Typography>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label={<Typography variant="body2">Autoplay</Typography>}
          labelPlacement="start"
        />
      </div>
      <div className={classes.recommend}>
        {!loading ? (
          videos.length ? (
            videos.map((video, index) => (
              <MediaItem key={index} video={video} />
            ))
          ) : (
            <Typography
              className={classes.text}
              color="textSecondary"
              align="center"
              variant="body2"
            >
              Related videos is not available
            </Typography>
          )
        ) : (
          <Loading />
        )}
      </div>
    </Paper>
  );
}
