import React, { useState } from "react";
import { makeStyles, Typography, Link } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";

import { NavLink } from "react-router-dom";

import ActionButtons from "./ActionButtons";
import CommentsDialog from "./CommentsDialog";
import SignInDialog from "./SignInDialog";

import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { toggleSubscribe } from "../../slices/videoSlice";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(0, 1.5),
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
    cursor: "pointer",
  },
  small: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    backgroundColor: "#00579c",
  },
  info: {
    margin: theme.spacing(0, 1.5),
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1.3, 0),
  },
  channel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  user: {
    marginLeft: theme.spacing(1.7),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
    fontWeight: 400,
    lineHeight: "normal",
    wordBreak: "break-word",
  },
  moreicon: {
    marginLeft: 10,
  },
  view: {
    color: "hsla(0,0%,6.7%, .6 )",
  },
  sub: {
    color: "hsla(0,0%,6.7%, .6 )",
  },
  discription: {
    padding: theme.spacing(2, 1.5, 4),
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    color: "hsla(0,0%,6.7%, .6 )",
  },
  btn: {
    color: "hsla(0,0%,6.7%, .6 )",
  },
  content: {
    padding: theme.spacing(0, 2),
    textAlign: "center",
  },
  action: {
    padding: 5,
  },
  contentText: {
    margin: 0,
  },
  comments: {
    padding: theme.spacing(1.5),
    paddingTop: theme.spacing(1),
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    color: "hsla(0,0%,6.7%, .6 )",
    cursor: "pointer",
  },
  toppart: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cmm: {
    display: "flex",
  },
  botpart: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  firstcomment: {
    marginLeft: 8,
    flex: 1,
    alignSelf: "center",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
    lineHeight: "normal",
    wordBreak: "break-word",
    fontSize: "0.85rem",
  },
  commentsCount: {
    marginLeft: 10,
  },
  small2: {
    width: 28,
    height: 28,
    backgroundColor: "#00579c",
  },
  small3: {
    width: 28,
    height: 28,
    alignSelf: "center",
    backgroundColor: "#556c7d",
    fontSize: "1rem",
  },
  smallInput: {
    flex: 1,
    alignSelf: "center",
    marginLeft: 8,
    backgroundColor: "#e8e8e8",
    borderRadius: 4,
    padding: "8px 15px",
    cursor: "pointer",
    color: "#9a9a9a",
  },
}));

export default function ActionBar({ playerHeight }) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const [focus, setFocus] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const {
    title,
    views,
    createdAt,
    description,
    author,
    subscribersCount,
    isMe,
    isSubscribed,
    commentsCount,
    firstComment,
  } = useSelector((state) => state.video);
  const time = moment(createdAt).format("ll");
  const letterAvatar = author.displayName.charAt(0).toUpperCase();
  const authLetterAvatar = user && user?.displayName.charAt(0).toUpperCase();
  const letterAvatar2 =
    firstComment && firstComment?.author?.displayName.charAt(0).toUpperCase();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenComments = () => {
    setOpenComments(true);
  };

  const handleCloseComments = () => {
    setFocus(false);
    setOpenComments(false);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const hanleOpenSignInDialog = () => {
    setOpenSignInDialog(true);
  };

  const handleCloseSignInDialog = () => {
    setOpenSignInDialog(false);
  };

  const handleSubscribe = () => {
    dispatch(toggleSubscribe(author._id));
  };

  const handleUnsubscribe = () => {
    dispatch(toggleSubscribe(author._id));
    setOpenModal(false);
  };

  return (
    <div>
      <div className={classes.title} onClick={handleOpen}>
        <div>
          <Typography className={classes.text} variant="h6">
            {title}
          </Typography>
          <Typography variant="caption" className={classes.view}>
            {views} views
          </Typography>
        </div>
        <ExpandMoreIcon className={classes.moreicon} />
      </div>

      <ActionButtons />

      <Divider />
      <div className={classes.info}>
        <Link
          color="inherit"
          underline="none"
          component={NavLink}
          to={`/channel/${author.userName}`}
          className={classes.channel}
        >
          <Avatar className={classes.small} alt="avatar" src={author.avatar}>
            {letterAvatar}
          </Avatar>
          <div className={classes.user}>
            <Typography variant="body2">{author.displayName}</Typography>
            <Typography variant="caption" className={classes.sub}>
              {subscribersCount} subscribers
            </Typography>
          </div>
        </Link>
        {!isAuthenticated ? (
          <Button color="secondary" onClick={hanleOpenSignInDialog}>
            Subscribe
          </Button>
        ) : isMe ? (
          <IconButton component={NavLink} to={`/profile/${user._id}`}>
            <SettingsIcon />
          </IconButton>
        ) : !isSubscribed ? (
          <Button color="secondary" onClick={handleSubscribe}>
            Subscribe
          </Button>
        ) : (
          <Button onClick={handleOpenModal} className={classes.btn}>
            Subscribed
          </Button>
        )}
      </div>

      <div className={classes.comments} onClick={handleOpenComments}>
        <div className={classes.toppart}>
          <div className={classes.cmm}>
            <Typography variant="body2">Comments</Typography>
            {commentsCount > 0 && (
              <Typography variant="body2" className={classes.commentsCount}>
                {commentsCount}
              </Typography>
            )}
          </div>
          <UnfoldMoreIcon fontSize="small" />
        </div>
        <div className={classes.botpart}>
          {commentsCount > 0 && firstComment ? (
            <>
              <Avatar
                className={classes.small3}
                alt="avatar"
                src={firstComment.author.avatar}
              >
                {letterAvatar2}
              </Avatar>
              <Typography className={classes.firstcomment} variant="caption">
                {firstComment.text}
              </Typography>
            </>
          ) : (
            <>
              {isAuthenticated ? (
                <Avatar
                  className={classes.small3}
                  alt="avatar"
                  src={user.avatar}
                >
                  {authLetterAvatar}
                </Avatar>
              ) : (
                <Avatar className={classes.small3} />
              )}
              <Typography
                onClick={isAuthenticated ? handleFocus : null}
                className={classes.smallInput}
                variant="body2"
              >
                Add a public comment...
              </Typography>
            </>
          )}
        </div>
      </div>

      {open && (
        <div className={classes.discription}>
          <Typography variant="body2">Published on {time}</Typography>
          {description && (
            <Typography variant="body2">{description}</Typography>
          )}
        </div>
      )}
      {openModal && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent className={classes.content}>
            <DialogContentText className={classes.contentText} variant="body2">
              Unsubscribe from {author.displayName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions classes={{ root: classes.action }}>
            <Button className={classes.btn} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleUnsubscribe} color="secondary">
              Unsubscribe
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {openComments && playerHeight && (
        <CommentsDialog
          playerHeight={playerHeight}
          open={openComments}
          closeComments={handleCloseComments}
          focus={focus}
        />
      )}
      {openSignInDialog && (
        <SignInDialog
          openSignInDialog={openSignInDialog}
          handleCloseSignInDialog={handleCloseSignInDialog}
          title="Want to subscribe to this channel?"
          content="Sign in to subscribe to this channel."
        />
      )}
    </div>
  );
}
