import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { IconButton, Link, Typography } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import { NavLink } from "react-router-dom";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 12,
    paddingLeft: theme.spacing(1.5),
    display: "flex",
    alignItems: "flex-start",
  },
  info: {
    padding: theme.spacing(0, 1),
    height: "100%",
  },
  gray: {
    color: "hsla(0,0%,6.7%, .6 )",
  },
  title: {
    wordBreak: "break-word",
    lineHeight: "normal",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
    fontSize: "1.1rem",
  },
  channel: {
    color: "hsla(0,0%,6.7%, .6 )",
    lineHeight: "100%",
  },
  duration: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "hsla(0,0%,6.7%, .8 )",
    color: "#eee",
    padding: "1px 4px",
    fontSize: 13,
    borderRadius: 2,
  },
  media: {
    height: 0,
    paddingTop: "58%",
    position: "relative",
  },
  menuList: {
    padding: 0,
    width: 255,
  },
}));

export default function Video({ video }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { _id, title, duration, thumbnail, views, createdAt } = video;
  const time = moment(createdAt).fromNow();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <CardMedia
            component={NavLink}
            to={`/watch/${_id}`}
            className={classes.media}
            image={thumbnail}
            title="poster"
          >
            <div className={classes.duration}>{duration}</div>
          </CardMedia>
        </Grid>
        <Grid item xs={6}>
          <Link
            component={NavLink}
            to={`/watch/${_id}`}
            underline="none"
            color="inherit"
          >
            <div className={classes.info}>
              <Typography className={classes.title} variant="subtitle1">
                {title}
              </Typography>
              <Typography variant="body2" className={classes.gray}>
                {views} views &#8226; {time}
              </Typography>
            </div>
          </Link>
        </Grid>
      </Grid>

      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      {open && (
        <Dialog open={open} onClose={handleClose}>
          <MenuList className={classes.menuList}>
            <MenuItem>Save to Watch later</MenuItem>
            <MenuItem onClick={handleClose}>Cancel</MenuItem>
          </MenuList>
        </Dialog>
      )}
    </div>
  );
}
