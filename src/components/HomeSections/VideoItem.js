import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  Link,
  useMediaQuery,
} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink, useHistory } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistPlayOutlinedIcon from '@material-ui/icons/PlaylistPlayOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import Divider from "@material-ui/core/Divider";

import moment from "moment";

import { useHover } from '../../hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
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
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      padding: "12px 0 18px 0",
    }
  },
  avatar: {
    backgroundColor: "#00579c",
    textDecoration: "none",
  },
  info: {
    marginLeft: theme.spacing(1.5),
    alignSelf: "center",
    flex: 1,
    paddingRight: theme.spacing(5),
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
    opacity: 0.8,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
    wordBreak: "break-word",
    marginTop: theme.spacing(1),
  },
  more: {
    marginLeft: "auto",
    padding: theme.spacing(1),
    position: "absolute",
    right: 0,
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
  const history = useHistory();

  const infoRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
  const isHover = useHover(infoRef);

  const matches = useMediaQuery('(min-width:960px)');

  const openMenu = (e) => {
    if (matches) {
      e.stopPropagation();
      setAnchorEl(e.currentTarget);
    }
    else setIsOpen(true)
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLinkClick = () => {
    matches && history.push(`/watch/${_id}`);
  }

  const disableLink = (e) => {
    e.stopPropagation();
  }

  useEffect(() => {
    matches ? setIsOpen(false) : setAnchorEl(null);
  }, [matches])

  return (
    <div className={classes.root} ref={infoRef}>
      <CardMedia
        component={NavLink}
        to={`/watch/${_id}`}
        className={classes.img}
        image={thumbnail}
        title="item"
        onClick={disableLink}
      >
        <Typography className={classes.time}>{duration}</Typography>
      </CardMedia>
      <div className={classes.channel} onClick={handleLinkClick}>
        <Avatar
          component={NavLink}
          to={`/channel/${author._id}`}
          className={classes.avatar}
          alt="avatar"
          src={author.avatar}
          onClick={disableLink}
        >
          {letterAvatar}
        </Avatar>
        <Link
          underline="none"
          color="inherit"
          className={classes.info}
          component={matches ? null : NavLink}
          to={`/watch/${_id}`}
        >
          {matches ?
            <Link
              underline="none"
              color='inherit'
              className={classes.title}
              variant="subtitle1"
              component={NavLink}
              to={`/watch/${_id}`}
              onClick={disableLink}
            >
              {title}
            </Link>
            :
            <Typography className={classes.title} variant="subtitle1">
              {title}
            </Typography>
          }

          {matches ?
            <div className={classes.sub} >
              <Tooltip title={author.displayName} placement="top-start">
                <Link
                  underline="none"
                  color='inherit'
                  variant="body2"
                  component={NavLink}
                  to={`/channel/${author._id}`}
                  onClick={disableLink}
                >
                  {author.displayName}
                </Link>
              </Tooltip>
              <Typography variant="body2">
                {views} views &#8226; {time}
              </Typography>
            </div> :
            <Typography className={classes.sub} variant="caption">
              {author.displayName} &#8226; {views} views &#8226; {time}
            </Typography>
          }
        </Link>
        {
          (isHover || open || !matches) && <IconButton className={classes.more} onClick={openMenu}>
            <MoreVertIcon />
          </IconButton>
        }
      </div >

      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={closeMenu}
        //   PaperProps={{ variant: "outlined", square: true }}
        >
          <MenuList className={classes.menuList}>
            <MenuItem>Not interested</MenuItem>
            <MenuItem>Save to Watch later</MenuItem>
            <MenuItem onClick={closeMenu}>Cancel</MenuItem>
          </MenuList>
        </Dialog>
      )
      }

      {
        open && <Menu
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon className={classes.menuIcon}>
              <PlaylistPlayOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Add to queue" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon className={classes.menuIcon}>
              <ScheduleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Save to Watch later" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon className={classes.menuIcon}>

              <PlaylistAddOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Save to playlist" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon className={classes.menuIcon}>
              <BlockOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Hide" />
          </MenuItem>
        </Menu>
      }

    </div >
  );
}
