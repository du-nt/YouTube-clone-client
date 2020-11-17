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

import { useSelector } from "react-redux";

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
    backgroundColor: "#00579c",
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

function ActionBar({ playerHeight }) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const [focus, setFocus] = useState(false);
  const classes = useStyles();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const isSub = true;
  const isMe = false;

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

  return (
    <div>
      <div className={classes.title} onClick={handleOpen}>
        <div>
          <Typography className={classes.text} variant="h6">
            Các bro cho mình hỏi, mình đã connect thành công vs Mongo, với model
            như này, nhưng khi User.findOne thì tìm ko đc, mình test với
            postman, vấn đề ở đâu ạ
          </Typography>
          <Typography variant="caption" className={classes.view}>
            222K view
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
          to="/channel/dfd"
          className={classes.channel}
        >
          <Avatar className={classes.small} />
          <div className={classes.user}>
            <Typography variant="body2">userName</Typography>
            <Typography variant="caption" className={classes.sub}>
              3K subscribers
            </Typography>
          </div>
        </Link>
        {!isAuthenticated ? (
          <Button color="secondary" onClick={hanleOpenSignInDialog}>
            Subscribe
          </Button>
        ) : isMe ? (
          <IconButton component={NavLink} to="/profile/dfdfs">
            <SettingsIcon />
          </IconButton>
        ) : !isSub ? (
          <Button color="secondary">Subscribe</Button>
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
            <Typography variant="body2" className={classes.commentsCount}>
              189
            </Typography>
          </div>
          <UnfoldMoreIcon fontSize="small" />
        </div>
        <div className={classes.botpart}>
          <Avatar className={classes.small3} />
          {/* <Typography className={classes.firstcomment} variant="caption">
            Nếu muốn Windows tự lấy màu dựa theo hình nền trên desktop thì ta
            click vào dòng Automatically pick an accent color from my
            background.
          </Typography> */}
          <Typography
            onClick={handleFocus}
            className={classes.smallInput}
            variant="body2"
          >
            Add a public comment...
          </Typography>
        </div>
      </div>

      {open && (
        <div className={classes.discription}>
          <Typography variant="body2">
            Nếu muốn Windows tự lấy màu dựa theo hình nền trên desktop thì ta
            click vào dòng Automatically pick an accent color from my
            background.
          </Typography>
        </div>
      )}
      {openModal && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent className={classes.content}>
            <DialogContentText className={classes.contentText} variant="body2">
              Unsubscribe from Tony Stark ABC Dua Leo?
            </DialogContentText>
          </DialogContent>
          <DialogActions classes={{ root: classes.action }}>
            <Button className={classes.btn} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleCloseModal} color="secondary">
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

export default ActionBar;
