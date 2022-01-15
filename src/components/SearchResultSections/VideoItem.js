import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { IconButton, Link, Typography, useMediaQuery } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import { NavLink } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistPlayOutlinedIcon from '@material-ui/icons/PlaylistPlayOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import Divider from "@material-ui/core/Divider";
import Tooltip from '@material-ui/core/Tooltip';

import moment from "moment";

import { useHover } from "../../hooks";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1.5),
    display: "flex",
    alignItems: "flex-start",
    position: "relative",
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(3),
    },
  },
  info: {
    height: "100%",
    paddingRight: theme.spacing(6),
    cursor: "pointer",
  },
  gray: {
    color: "hsla(0,0%,6.7%, .6 )",
    wordBreak: "break-word",
    lineHeight: "normal",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
    overflow: "hidden",
  },
  title: {
    color: 'inherit',
    textDecoration: 'none',
    wordBreak: "break-word",
    lineHeight: "normal",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
    [theme.breakpoints.up('md')]: {
      fontSize: "1.1rem",
    },
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
  moreBtn: {
    position: "absolute",
    right: 0,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(0.7)
  },
  avatar: {
    display: "inline-flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
}));

export default function Video({ video }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { _id, title, duration, thumbnail, views, createdAt, author } = video;
  const time = moment(createdAt).fromNow();
  const letterAvatar = author.displayName.charAt(0).toUpperCase();
  const history = useHistory();

  const videoRef = useRef(null);
  const isHover = useHover(videoRef);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)

  const matches = useMediaQuery('(min-width:960px)');
  const match600 = useMediaQuery('(min-width:600px)');

  const handleOpen = (e) => {
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

  const handleLinkClick = (e) => {
    e.stopPropagation();
  }

  useEffect(() => {
    matches ? setIsOpen(false) : setAnchorEl(null);
  }, [matches])


  return (
    <div className={classes.root} ref={videoRef}>
      <Grid container spacing={matches ? 3 : 2} >
        <Grid item xs={match600 ? 4 : 5}>
          <CardMedia
            component={NavLink}
            to={`/watch/${_id}`}
            className={classes.media}
            image={thumbnail}
            title="poster"
          >
            <Typography className={classes.duration}>{duration}</Typography>
          </CardMedia>
        </Grid>
        <Grid item xs={match600 ? 8 : 7}>
          <div className={classes.info} onClick={() => history.push(`/watch/${_id}`)}>
            <Typography onClick={handleLinkClick} component={NavLink} to={`/watch/${_id}`} className={classes.title} variant={match600 ? 'body1' : 'body2'}>
              {title}
            </Typography>
            {matches ?
              <>
                <Typography variant="body2" className={classes.gray}>
                  {views} views &#8226; {time}
                </Typography>
                <Link underline='none' className={classes.avatar} onClick={handleLinkClick} component={NavLink} to={`/channel/${author._id}`}>
                  <Avatar alt="avatar" src={author.avatar} className={classes.small} >
                    {letterAvatar}
                  </Avatar>
                  <Tooltip title={author.displayName} placement="top-start">
                    <Typography className={classes.gray} variant="body2" >
                      {author.displayName}
                    </Typography>
                  </Tooltip>
                </Link>
              </>
              :
              <>
                <Typography component="div" className={classes.gray} variant={match600 ? 'body2' : 'caption'}>
                  {author.displayName}
                </Typography>
                <Typography component="div" variant={match600 ? 'body2' : 'caption'} className={classes.gray}>
                  {views} views &#8226; {time}
                </Typography>
              </>
            }

          </div>
        </Grid>
      </Grid>

      {(isHover || open || !matches) && <IconButton onClick={handleOpen} className={classes.moreBtn}>
        <MoreVertIcon />
      </IconButton>
      }

      {isOpen && (
        <Dialog open={isOpen} onClose={closeMenu}>
          <MenuList className={classes.menuList}>
            <MenuItem>Save to Watch later</MenuItem>
            <MenuItem onClick={closeMenu}>Cancel</MenuItem>
          </MenuList>
        </Dialog>
      )}

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
              <FlagOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </MenuItem>
        </Menu>
      }

    </div>
  );
}
