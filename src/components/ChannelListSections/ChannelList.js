import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";

import TopBar from "./TopBar";
import User from "./User";
import DesktopUserItem from "./DesktopUserItem";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0, 2),
    marginBottom: 65,
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
    },
  },
}));

export default function ChannelList() {
  const classes = useStyles();
  const { user } = useSelector(state => state.auth);
  const [users] = useState(user.subscribedUsers);

  const matches = useMediaQuery('(min-width:960px)');

  return (
    <>
      {!matches && <TopBar />}

      <div className={classes.container}>
        <Grid container justify="center">
          <Grid item xs={12} md={12} lg={8} xl={6}>
            {users.map((user, index) => (
              !matches ? <User key={index} user={user} />
                :
                <Grid key={index} container justify="center" spacing={6} >
                  <Grid item xs={12} >
                    <DesktopUserItem user={user} />
                  </Grid>
                </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
