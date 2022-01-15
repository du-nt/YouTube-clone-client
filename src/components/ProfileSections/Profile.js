import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import { Typography } from "@material-ui/core";

import BlankHeader from "./BlankHeader";
import FormDialog from "./FormDialog";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { changeCover, changePhoto } from "../../slices/authSlice";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    maxHeight: 100,
    objectFit: "cover",
    objectPosition: "center",
    [theme.breakpoints.up("sm")]: {
      maxHeight: 180,
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: 220,
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: 250,
    },
    [theme.breakpoints.up("xl")]: {
      maxHeight: 350,
    }
  },
  parent: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 10,
    bottom: 10,
    zIndex: 100,
  },
  icon2: {
    width: 64,
    height: 64,
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
    zIndex: 1000,
    padding: 18,
    borderRadius: "50%",
    border: "3px solid #fff",
    color: "#fff",
    cursor: "pointer",
    boxSizing: "border-box",
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
  input: {
    display: "none",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { avatar, displayName, cover } = useSelector(
    (state) => state.auth.user
  );
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:960px)')

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeCover = ({ target }) => {
    if (target.files[0]) {
      const data = new FormData();
      data.append("file", target.files[0]);
      dispatch(changeCover(data));
    }
  };

  const handleChangePhoto = ({ target }) => {
    if (target.files[0]) {
      const data = new FormData();
      data.append("file", target.files[0]);
      dispatch(changePhoto(data));
    }
  };

  return (
    <>
      {!matches && <BlankHeader />}
      <div className={classes.parent}>
        <img alt="cover" src={cover} className={classes.img} />
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleChangeCover}
        />
        <label htmlFor="contained-button-file">
          <IconButton className={classes.icon} component="span">
            <CameraAltIcon />
          </IconButton>
        </label>
        <Avatar alt="avatar" src={avatar} className={classes.large}>
          <CameraAltIcon />
        </Avatar>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={handleChangePhoto}
        />
        <label htmlFor="icon-button-file">
          <div className={classes.icon2}>
            <CameraAltIcon />
          </div>
        </label>
      </div>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={11} lg={10} xl={7}>
          <div className={classes.body}>
            <Typography color="textSecondary" variant="body2">
              Name
            </Typography>
            <div className={classes.div}>
              <Typography variant="h6">{displayName}</Typography>
              <IconButton onClick={handleOpen}>
                <EditIcon />
              </IconButton>
            </div>
            <Typography color="textSecondary" variant="body2">
              Description
            </Typography>
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
        </Grid>
      </Grid>

      {open && <FormDialog open={open} handleCloseForm={handleClose} />}
    </>
  );
}
