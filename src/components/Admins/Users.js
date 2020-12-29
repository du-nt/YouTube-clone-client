import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CheckIcon from "@material-ui/icons/Check";

import { getUsers, deleteUser } from "../../slices/admin";

const useStyles = makeStyles((theme) => ({
  root2: {
    marginTop: 12,
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
  },
  loading: {
    marginTop: "30%",
    display: "flex",
    justifyContent: "center",
  },
  noVideos: {
    marginTop: "30%",
  },
  title: {
    wordBreak: "break-word",
    lineHeight: "normal",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "3",
    overflow: "hidden",
    fontSize: "1.1rem",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: "#00579c",
    textDecoration: "none",
    fontSize: 30,
  },
  icon: {
    backgroundColor: "#1877f2",
    color: "#fff",
    borderRadius: "50%",
    fontSize: "0.9rem",
    marginLeft: theme.spacing(1),
  },
  name: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function Users() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(getUsers(setLoading, setUsers));
  }, [dispatch]);

  const handleDelete = (_id) => {
    dispatch(deleteUser(_id, setUsers));
  };

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );

  return users.length ? (
    users.map(({ avatar, displayName, adminRole, _id }, index) => (
      <div className={classes.root2} key={index}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Grid container justify="center">
              <Avatar alt="avatar" src={avatar} className={classes.large}>
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <div className={classes.name}>
              <Typography className={classes.title} variant="subtitle1">
                {displayName}
              </Typography>
              {adminRole && (
                <CheckIcon fontSize="small" className={classes.icon} />
              )}
            </div>
          </Grid>
          <Grid item xs={3}>
            <Grid container justify="flex-end">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(_id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    ))
  ) : (
    <Typography
      align="center"
      color="textSecondary"
      className={classes.noVideos}
    >
      No user
    </Typography>
  );
}
