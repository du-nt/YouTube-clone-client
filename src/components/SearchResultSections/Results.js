import React, { useState, useEffect } from "react";
import { Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import { search } from "../../slices/userSlice";

import UserItem from "./UserItem";
import VideoItem from "./VideoItem";
import DesktopUserItem from "../ChannelListSections/DesktopUserItem";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    paddingBottom: 50,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: 0,
      marginTop: theme.spacing(5),

    }
  },
  loading: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
  },
  users: {
    marginBottom: theme.spacing(3)
  }
}));

export default function Results() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const matches = useMediaQuery("(min-width:960px)");

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery().get("search");

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
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          {users.length > 0 &&
            <div >
              <div className={classes.users}>
                <Grid container justify="center" spacing={3}  >
                  {users.map((user, index) => (

                    <Grid key={index} item xs={12} >
                      {matches ?
                        <DesktopUserItem user={{ userTo: user }} key={index} />
                        :
                        <UserItem key={index} user={user} />
                      }
                    </Grid>

                  ))}
                </Grid>
              </div>
              {matches && <Divider />}
            </div>
          }
          <div>
            {videos.map((video, index) => (
              <VideoItem key={index} video={video} />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
