import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { toggleSubscribe } from "../../slices/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 0, 0, 2),
    marginLeft: theme.spacing(2),
    position: "relative",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: "#00579c",
    position: "absolute",
    left: 0,
    top: -31.5,
    fontSize: 28,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  info: {
    display: "flex",
    alignItems: "center",
  },
  right: {
    marginLeft: 12,
    marginTop: 12,
  },
  sub: {
    padding: theme.spacing(0.5, 0),
  },
  user: {
    fontWeight: 400,
    lineHeight: 1,
  },
  btn: {
    position: "relative",
    left: -5,
  },
  img: {
    maxHeight: 100,
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  contentText: {
    margin: 0,
  },
  title: {
    fontWeight: 400,
    fontSize: "1.1rem",
    padding: theme.spacing(2, 3, 0, 3),
  },
  action: {
    paddingTop: 0,
  },
  button: {
    color: "hsla(0,0%,6.7%, .6 )",
  },
  button2: {
    color: "hsla(0,0%,6.7%, .6 )",
    position: "relative",
    left: -8,
  },
  content2: {
    padding: theme.spacing(0, 2),
    textAlign: "center",
  },
  action2: {
    padding: 5,
  },
  contentText2: {
    margin: 0,
  },
  setting: {
    marginLeft: "auto",
  },
}));

export default function BannerInfo() {
  const classes = useStyles();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const {
    _id,
    displayName,
    avatar,
    cover,
    isMe,
    isSubscribed,
    subscribersCount,
  } = useSelector((state) => state.user);
  const letterAvatar = displayName.charAt(0).toUpperCase();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const hanleOpenSignInDialog = () => {
    setOpenSignInDialog(true);
  };

  const handleCloseSignInDialog = () => {
    setOpenSignInDialog(false);
  };

  const handleSubscribe = () => {
    dispatch(toggleSubscribe(_id));
  };

  const handleUnsubscribe = () => {
    dispatch(toggleSubscribe(_id));
    setOpenModal(false);
  };

  return (
    <>
      <img alt="banner" src={cover} className={classes.img} />
      <div className={classes.root}>
        <Avatar alt="avatar" src={avatar} className={classes.large}>
          {letterAvatar}
        </Avatar>
        <div className={classes.right}>
          <Typography className={classes.user} variant="h6">
            {displayName}
          </Typography>
          <div className={classes.info}>
            {!isAuthenticated ? (
              <Button
                startIcon={<YouTubeIcon />}
                color="secondary"
                className={classes.btn}
                onClick={hanleOpenSignInDialog}
              >
                Subscribe
              </Button>
            ) : isMe ? null : !isSubscribed ? (
              <Button
                startIcon={<YouTubeIcon />}
                color="secondary"
                className={classes.btn}
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            ) : (
              <Button className={classes.button2} onClick={handleOpenModal}>
                Subscribed
              </Button>
            )}
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.sub}
            >
              {subscribersCount} subscribers
            </Typography>
          </div>
        </div>
        {isMe && (
          <IconButton
            className={classes.setting}
            component={NavLink}
            to={`/profile/${_id}`}
          >
            <SettingsIcon />
          </IconButton>
        )}
      </div>

      {openModal && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent className={classes.content2}>
            <DialogContentText className={classes.contentText2} variant="body2">
              Unsubscribe from {displayName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions classes={{ root: classes.action2 }}>
            <Button className={classes.button} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleUnsubscribe} color="secondary">
              Unsubscribe
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {openSignInDialog && (
        <Dialog open={openSignInDialog} onClose={handleCloseSignInDialog}>
          <Typography className={classes.title}>
            Want to subscribe to this channel?
          </Typography>
          <DialogContent>
            <DialogContentText className={classes.contentText} variant="body2">
              Sign in to subscribe to this channel.
            </DialogContentText>
          </DialogContent>
          <DialogActions classes={{ root: classes.action }}>
            <Button
              className={classes.button}
              onClick={handleCloseSignInDialog}
            >
              Cancel
            </Button>
            <Button
              component={NavLink}
              to={{ pathname: "/login", state: { from: location.pathname } }}
              color="secondary"
            >
              Sign in
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
