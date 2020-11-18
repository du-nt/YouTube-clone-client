import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";

import BlankHeader from "./BlankHeader";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    maxHeight: 100,
    objectFit: "cover",
    objectPosition: "center",
  },
  parent: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#e4e6eb",
    zIndex: 100,
    padding: theme.spacing(0.5),
    borderRadius: "50%",
    border: "1px solid #404040",
    color: "#404040",
    cursor: "pointer",
  },
  icon2: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
    zIndex: 1000,
    padding: 18,
    borderRadius: "50%",
    border: "2px solid #fff",
    color: "#fff",
    cursor: "pointer",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    backgroundColor: "#00579c",
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
    border: "2px solid #fff",
    boxSizing: "border-box",
  },
  body: {
    padding: theme.spacing(2, 0, 2, 1.5),
  },
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  div2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  subText: {
    padding: theme.spacing(3, 1.5),
  },
  part2: {
    padding: theme.spacing(3, 0, 2, 1.5),
  },
  bold: {
    fontWeight: 600,
  },
}));

export default function Profile() {
  const classes = useStyles();
  const url =
    "https://media.istockphoto.com/vectors/vector-white-triangular-mosaic-texture-modern-low-poly-background-vector-id1200558861?b=1&k=6&m=1200558861&s=612x612&w=0&h=tEcC_NMFGARPnTQOxXYobgdAyVWvVYDRuK4-7_ZbEds=";

  return (
    <>
      <BlankHeader />
      <div className={classes.parent}>
        <img alt="cover" src={url} className={classes.img} />
        <CameraAltIcon className={classes.icon} />
        <Avatar
          alt="avatar"
          src="https://i.pinimg.com/736x/3e/11/bf/3e11bf0157a7604ad2de5c6269d6ab57.jpg"
          className={classes.large}
        >
          <CameraAltIcon />
        </Avatar>
        <CameraAltIcon
          className={classes.icon2}
          onClick={() => console.log("object")}
        />
      </div>

      <div className={classes.body}>
        <Typography color="textSecondary">Name</Typography>
        <div className={classes.div}>
          <Typography variant="h6">User Name</Typography>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
        <Typography color="textSecondary">Description</Typography>
        <div className={classes.div}>
          <Typography variant="subtitle1">Nothing</Typography>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
      </div>
      <Divider />
      <div className={classes.part2}>
        <Typography variant="subtitle1" className={classes.bold}>
          Privacy
        </Typography>
        <div className={classes.div2}>
          <Typography>Keep all my subscriptions private</Typography>
          <Switch color="primary" />
        </div>

        <div className={classes.div2}>
          <Typography>Keep all my saved playlists private</Typography>
          <Switch color="primary" />
        </div>
      </div>
      <Divider />
      <div className={classes.subText}>
        <Typography display="inline" variant="body2">
          Your name and profile picture are linked to your Google Account. Any
          changes will show on your account and channel, and may take a few
          minutes to apply. Make sure your picture follows
          <Typography color="primary" component="span" variant="body2">
            <span> </span>Community guidelines. Learn more
          </Typography>
        </Typography>
      </div>
    </>
  );
}
