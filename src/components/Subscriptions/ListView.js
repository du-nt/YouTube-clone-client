import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import { NavLink } from "react-router-dom";
import { Avatar, IconButton, Link, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import { useHistory } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistPlayOutlinedIcon from '@material-ui/icons/PlaylistPlayOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import Tooltip from '@material-ui/core/Tooltip';


import { useHover } from '../../hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3.5),
  },
  info: {
    paddingLeft: theme.spacing(3),
    cursor: "pointer",
    maxWidth: '75%'
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
    fontWeight: 500,
    textDecoration: "none",
    color: "inherit",
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
    paddingTop: "53%",
    position: "relative",
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    marginBottom: theme.spacing(2)
  },
  large: {
    marginRight: theme.spacing(1.5),
    backgroundColor: "#00579c",
  },
  text: {
    color: "#030303",
    fontWeight: 500
  },
  author: {
    textDecoration: "none",
    color: "inherit"
  },
  linkInfo: {
    width: 'fit-content',
  },
  sub: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
    wordBreak: "break-word",
    marginBottom: theme.spacing(1),
    marginTop: 2
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  moreIcon: {
    padding: theme.spacing(1),
    position: "absolute",
    right: 0,
  },
  menuIcon: {
    minWidth: 40
  }
}));

export default function ListView({ video }) {
  const classes = useStyles();
  const history = useHistory();
  const infoRef = useRef(null);
  const isHover = useHover(infoRef);
  const [anchorEl, setAnchorEl] = useState(null);

  const { _id, thumbnail, duration, title, author, views, description, createdAt } = video;
  const letterAvatar = author.displayName.charAt(0).toUpperCase();
  const time = moment(createdAt).format("ll");
  const relativeTime = moment(createdAt).fromNow();

  const open = Boolean(anchorEl)

  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  }

  return (
    <>
      <div className={classes.root} >
        <Link
          underline="none"
          component={NavLink}
          to={`/channel/${author._id}`}
          className={classes.link}
        >
          <Avatar alt="avatar" src={author.avatar} className={classes.large}>
            {letterAvatar}
          </Avatar>
          <Typography className={classes.text}>{author.displayName}</Typography>
        </Link>
        <Grid container >
          <Grid item xs={4} >
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
          <Grid item xs={8}>
            <div className={classes.info} ref={infoRef} onClick={() => history.push(`/watch/${_id}`)}>
              <div className={classes.titleWrapper} >
                <Typography onClick={handleLinkClick} component={NavLink} to={`/watch/${_id}`} className={classes.title} variant="subtitle1">
                  {title}
                </Typography>
                {(isHover || open) &&
                  <IconButton
                    onClick={handleClick}
                    className={classes.moreIcon}
                  >
                    <MoreVertIcon />
                  </IconButton>}
              </div>
              <Typography className={classes.sub} variant="caption">
                <Tooltip title={author.displayName} placement="top-start">
                  <Typography onClick={handleLinkClick} variant="body2" component={NavLink} to={`/channel/${author._id}`} className={classes.author}>
                    {author.displayName}
                  </Typography>
                </Tooltip>
                <span> </span>
                <Typography component='span' variant="body2">
                  &#8226; {views} views &#8226; {relativeTime}
                </Typography>
              </Typography>
              <Typography variant="body2">{description ? description : `Published on ${time}`}</Typography>
            </div>
          </Grid>
        </Grid>
      </div>

      <Divider />

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
    </>
  );
}
