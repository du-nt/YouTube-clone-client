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

const url =
  "https://vcdn-ngoisao.vnecdn.net/2019/03/12/y-thien-do-long-ky-8903-1552359368.jpg";

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

export default function MediaItem() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
            to="/"
            className={classes.media}
            image={url}
            title="poster"
          >
            <div className={classes.duration}>21:36</div>
          </CardMedia>
        </Grid>
        <Grid item xs={6}>
          <Link component={NavLink} to="/" underline="none" color="inherit">
            <div className={classes.info}>
              <Typography className={classes.title} variant="subtitle1">
                Đây là group trao đổi kinh nghiệm thực tế khi làm việc: khó
                khăn, công nghệ mới, tuyển dụng và nhiều thứ khác
              </Typography>
              <Typography variant="body2" className={classes.channel}>
                Dua Leo
              </Typography>
              <Typography variant="caption" className={classes.gray}>
                100K views
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
