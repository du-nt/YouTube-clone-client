import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1.1),
    borderBottom: "1px solid #e0e0e0",
  },
  icons: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1, 0.9),
    },
  },
  small: {
    width: theme.spacing(4.2),
    height: theme.spacing(4.2),
    backgroundColor: "#00579c",
    textDecoration: "none",
  },
}));

export default function SubscribedBar({ users }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icons}>
        {users.map((user, index) => (
          <Avatar
            key={index}
            className={classes.small}
            alt="avatar"
            src={user.avatar}
            component={NavLink}
            to={`/channel/${user.userName}`}
          >
            {user.displayName.charAt(0).toUpperCase()}
          </Avatar>
        ))}
      </div>
      <IconButton color="primary">
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
}
