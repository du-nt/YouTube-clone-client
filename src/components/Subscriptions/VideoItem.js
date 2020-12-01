import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  Link,
} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  img: {
    height: 0,
    paddingTop: "56.25%",
    position: "relative",
  },
  channel: {
    display: "flex",
    alignItems: "flex-start",
    padding: "12px 0 18px 16px",
  },
  avatar: {
    backgroundColor: "#00579c",
    textDecoration: "none",
  },
  info: {
    marginLeft: theme.spacing(1.5),
    alignSelf: "center",
    flex: 1,
  },
  title: {
    fontWeight: 500,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
    wordBreak: "break-word",
    lineHeight: "normal",
    marginBottom: 2,
  },
  sub: {
    opacity: 0.6,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
    wordBreak: "break-word",
  },
  more: {
    marginLeft: "auto",
    padding: theme.spacing(1),
  },
  time: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "hsla(0,0%,6.7%, .8 )",
    color: "#eee",
    padding: "1px 4px",
    fontSize: 13,
    borderRadius: 2,
  },
  menuList: {
    padding: 0,
    width: 255,
  },
}));

export default function VideoItem({ video }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { author, _id, thumbnail, duration, title, views, createdAt } = video;
  const letterAvatar = author.displayName.charAt(0).toUpperCase();
  const time = moment(createdAt).fromNow();

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.root}>
      <CardMedia
        component={NavLink}
        to={`/watch/${_id}`}
        className={classes.img}
        image={thumbnail}
        title="item"
      >
        <div className={classes.time}>{duration}</div>
      </CardMedia>
      <div className={classes.channel}>
        <Avatar
          component={NavLink}
          to={`/channel/${author.userName}`}
          className={classes.avatar}
          alt="avatar"
          src={author.avatar}
        >
          {letterAvatar}
        </Avatar>
        <Link
          underline="none"
          color="inherit"
          className={classes.info}
          component={NavLink}
          to={`/watch/${_id}`}
        >
          <Typography className={classes.title} variant="subtitle1">
            {title}
          </Typography>
          <Typography className={classes.sub} variant="caption">
            {author.displayName} &#8226; {views} views &#8226; {time}
          </Typography>
        </Link>
        <IconButton className={classes.more} onClick={openMenu}>
          <MoreVertIcon />
        </IconButton>
      </div>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={closeMenu}
          //   PaperProps={{ variant: "outlined", square: true }}
        >
          <MenuList className={classes.menuList}>
            <MenuItem>Save to Watch later</MenuItem>
            <MenuItem onClick={closeMenu}>Cancel</MenuItem>
          </MenuList>
        </Dialog>
      )}
    </div>
  );
}
