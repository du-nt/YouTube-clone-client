import React from "react";
import { Avatar, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1.7, 0),
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(1.5),
    backgroundColor: "#00579c",
  },
  text: {
    color: "#131313",
  },
}));

export default function User({ user }) {
  const classes = useStyles();
  const { _id, avatar, displayName } = user.userTo;
  const letterAvatar = displayName.charAt(0).toUpperCase();

  return (
    <Link
      underline="none"
      component={NavLink}
      to={`/channel/${_id}`}
      className={classes.root}
    >
      <Avatar alt="avatar" src={avatar} className={classes.large}>
        {letterAvatar}
      </Avatar>
      <Typography className={classes.text}>{displayName}</Typography>
    </Link>
  );
}
