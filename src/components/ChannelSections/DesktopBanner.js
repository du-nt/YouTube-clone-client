import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { NotificationsNoneOutlined } from '@material-ui/icons';
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import Popup from '../HomeSections/Desktop/Popup';
import Divider from '@material-ui/core/Divider';

import { toggleSubscribe } from "../../slices/videoSlice";
import { toggleSubscribeSuccess } from "../../slices/userSlice";
import { addSubscribedUsers } from "../../slices/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2, 0),
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  desktop: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    backgroundColor: "#00579c",
    fontSize: 28,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: "#00579c",
    fontSize: 30,
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
    marginRight: theme.spacing(0.5)
  },
  img: {
    maxHeight: 100,
    width: "100%",
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
  contentText: {
    margin: 0,
  },
  title: {
    fontWeight: 400,
    fontSize: "1.1rem",
    padding: theme.spacing(2, 3, 0, 3),
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
}));

export default function BannerInfo() {
  const classes = useStyles();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const {
    _id,
    displayName,
    avatar,
    cover,
    isSubscribed,
    subscribersCount,
    videosCount
  } = useSelector((state) => state.user);
  const isMe = user?._id === _id

  const letterAvatar = displayName.charAt(0).toUpperCase();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubscribe = () => {
    const newSubscribedUser = {
      userTo: {
        _id,
        displayName,
        avatar,
        subscribersCount,
        videosCount,
      }
    }
    dispatch(toggleSubscribe(_id));
    dispatch(toggleSubscribeSuccess());
    dispatch(addSubscribedUsers(newSubscribedUser))
  };

  const handleUnsubscribe = () => {
    dispatch(toggleSubscribe(_id));
    dispatch(toggleSubscribeSuccess());
    setOpenModal(false);
  };

  return (
    <>
      <img alt="banner" src={cover} className={classes.img} />
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={11} lg={10} xl={7}>
          <div className={classes.root}>
            <div className={classes.left}>
              <Avatar alt="avatar" src={avatar} className={classes.large}>
                {letterAvatar}
              </Avatar>
              <div className={classes.right}>
                <Tooltip title={displayName} placement="top">
                  <Typography className={classes.user} variant="h6">
                    {displayName}
                  </Typography>
                </Tooltip>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.sub}
                >
                  {subscribersCount} subscribers
                </Typography>
              </div>
            </div>

            {!isAuthenticated ?
              <Button onClick={handleClick} variant="contained" color="secondary">
                Subscribe
              </Button>
              : isMe ?
                <Button
                  variant="contained"
                  color="primary"
                  component={NavLink}
                  to={`/profile/${_id}`}
                >
                  Customise Channel
                </Button>
                : isSubscribed ?
                  <div>
                    <Button
                      variant="contained"
                      className={classes.btn}
                      onClick={handleOpenModal}
                    >Subscribed
                    </Button>
                    <IconButton>
                      <NotificationsNoneOutlined />
                    </IconButton>
                  </div>
                  :
                  <Button onClick={handleSubscribe} variant="contained" color="secondary">
                    Subscribe
                  </Button>
            }
          </div>
        </Grid>
      </Grid>

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

      <Popup open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleClose={handleClose}
      >
        <Typography className={classes.title}>
          Want to subscribe to this channel?
        </Typography>
        <DialogContent>
          <DialogContentText className={classes.contentText} variant="body2">
            Sign in to subscribe to this channel.
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions >
          <Button
            component={NavLink}
            to={{ pathname: "/login", state: { from: location.pathname } }}
            color="primary"
          >
            Sign in
          </Button>
        </DialogActions>
      </Popup>

    </>
  );
}
