import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import FlagIcon from "@material-ui/icons/Flag";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";

import SignInDialog from "./SignInDialog";
import ShareButton from "./ShareButton";

import { like, dislike } from "../../slices/videoSlice";

const useStyles = makeStyles((theme) => ({
  btnGroup: {
    margin: theme.spacing(0, 1.5),
    marginBottom: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "capitalize",
    fontSize: 12,
    color: "#707070",
  },
  active: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "capitalize",
    fontSize: 12,
    color: "#065fd4",
  },
  startIcon: {
    margin: 0,
  },
  iconBtn: {
    "& > *": {
      fontSize: "28px !important",
    },
  },
  iconBtn2: {
    "& > *": {
      fontSize: "28px !important",
      transform: "rotateY(180deg)",
    },
  },
}));

export default function ActionButtons() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const [text, setText] = useState("");
  const [content, setContent] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);
  const {
    _id,
    title,
    likesCount,
    dislikesCount,
    isLiked,
    isDisliked,
  } = useSelector((state) => state.video);

  const hanleOpenSignInDialog0 = () => {
    setText("Like this video?");
    setContent("Sign in to make your opinion count.");
    setOpenSignInDialog(true);
  };

  const hanleOpenSignInDialog1 = () => {
    setText("Don't like this video?");
    setContent("Sign in to make your opinion count.");
    setOpenSignInDialog(true);
  };

  const hanleOpenSignInDialog2 = () => {
    setText("Want to watch this again later?");
    setContent("Sign in to add this video to a playlist.");
    setOpenSignInDialog(true);
  };

  const hanleOpenSignInDialog3 = () => {
    setText("Need to report the video?");
    setContent("Sign in to report inappropriate content.");
    setOpenSignInDialog(true);
  };

  const handleCloseSignInDialog = () => {
    setOpenSignInDialog(false);
    setText("");
    setContent("");
  };

  const handleLike = () => {
    dispatch(like(_id));
  };

  const handleDislike = () => {
    dispatch(dislike(_id));
  };

  return (
    <>
      <div className={classes.btnGroup}>
        <Button
          classes={{
            label: isLiked ? classes.active : classes.label,
            startIcon: classes.startIcon,
            iconSizeMedium: classes.iconBtn,
          }}
          startIcon={<ThumbUpAltIcon />}
          onClick={!isAuthenticated ? hanleOpenSignInDialog0 : handleLike}
        >
          {likesCount}
        </Button>
        <Button
          classes={{
            label: isDisliked ? classes.active : classes.label,
            startIcon: classes.startIcon,
            iconSizeMedium: classes.iconBtn,
          }}
          startIcon={<ThumbDownAltIcon />}
          onClick={!isAuthenticated ? hanleOpenSignInDialog1 : handleDislike}
        >
          {dislikesCount}
        </Button>
        <ShareButton
          config={{
            params: {
              title: "My share",
              text: title,
              url: window.location.href,
            },
          }}
        />
        <Button
          classes={{
            label: classes.label,
            startIcon: classes.startIcon,
            iconSizeMedium: classes.iconBtn,
          }}
          startIcon={<PlaylistAddIcon />}
          onClick={!isAuthenticated ? hanleOpenSignInDialog2 : null}
        >
          Save
        </Button>
        <Button
          classes={{
            label: classes.label,
            startIcon: classes.startIcon,
            iconSizeMedium: classes.iconBtn,
          }}
          startIcon={<FlagIcon />}
          onClick={!isAuthenticated ? hanleOpenSignInDialog3 : null}
        >
          Report
        </Button>
      </div>
      {openSignInDialog && (
        <SignInDialog
          openSignInDialog={openSignInDialog}
          handleCloseSignInDialog={handleCloseSignInDialog}
          title={text}
          content={content}
        />
      )}
    </>
  );
}
