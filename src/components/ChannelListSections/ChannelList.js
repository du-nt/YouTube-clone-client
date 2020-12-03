import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";

import TopBar from "./TopBar";
import User from "./User";

import { getUsers } from "../../slices/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
  },
  container: {
    padding: theme.spacing(0, 2),
    marginBottom: 65,
  },
}));

export default function ChannelList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(getUsers(setLoading, setUsers));
  }, [dispatch]);

  return (
    <>
      <TopBar />
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.container}>
          {users.map((user, index) => (
            <User key={index} user={user} />
          ))}
        </div>
      )}
    </>
  );
}
