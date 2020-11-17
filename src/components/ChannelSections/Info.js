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
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 0, 1, 2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: "#00579c",
    position: "relative",
    top: -3.5,
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
  button2: {
    color: "hsla(0,0%,6.7%, .6 )",
    position: "relative",
    left: -8,
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
    position: "relative",
    top: -5,
  },
}));

export default function Info() {
  const classes = useStyles();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const isSub = false;
  const isMe = true;

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

  return (
    <>
      <div className={classes.root}>
        <Avatar alt="avatar" className={classes.large} />
        <div className={classes.right}>
          <Typography className={classes.user} variant="h6">
            User Name
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
            ) : isMe ? null : !isSub ? (
              <Button
                startIcon={<YouTubeIcon />}
                color="secondary"
                className={classes.btn}
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
              2 subscribers
            </Typography>
          </div>
        </div>
        {isMe && (
          <IconButton
            className={classes.setting}
            component={NavLink}
            to="/profile/fds"
          >
            <SettingsIcon />
          </IconButton>
        )}
      </div>

      {openModal && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent className={classes.content2}>
            <DialogContentText className={classes.contentText2} variant="body2">
              Unsubscribe from Tony Stark ABC Dua Leo?
            </DialogContentText>
          </DialogContent>
          <DialogActions classes={{ root: classes.action2 }}>
            <Button className={classes.button} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleCloseModal} color="secondary">
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
