import React from "react";
import { Avatar, IconButton, Typography, makeStyles } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid #cfcfcf",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  channel: {
    display: "flex",
    padding: "12px 0 24px 16px",
  },
  info: {
    marginLeft: theme.spacing(1.5),
  },
  more: {
    marginLeft: "auto",
  },
}));

export default function VideoItem() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        className={classes.img}
        alt="cover"
        src="https://steamuserimages-a.akamaihd.net/ugc/920293967499591821/07094C170E7EBDA9AA7B30A167CAA71AD732E11E/"
      />
      <div className={classes.channel}>
        <Avatar />
        <div className={classes.info}>
          <Typography>Woking with Strings</Typography>
          <Typography>NoobCoder &#8226; 22 views &#8226; 2 days ago</Typography>
        </div>
        <IconButton className={classes.more}>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
}
