import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ReplyIcon from "@material-ui/icons/Reply";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import FlagIcon from "@material-ui/icons/Flag";
import Button from "@material-ui/core/Button";

import SignInDialog from "./SignInDialog";
import { useSelector } from "react-redux";

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
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const hanleOpenSignInDialog0 = () => {
    setTitle("Like this video?");
    setContent("Sign in to make your opinion count.");
    setOpenSignInDialog(true);
  };

  const hanleOpenSignInDialog1 = () => {
    setTitle("Don't like this video?");
    setContent("Sign in to make your opinion count.");
    setOpenSignInDialog(true);
  };

  const hanleOpenSignInDialog2 = () => {
    setTitle("Want to watch this again later?");
    setContent("Sign in to add this video to a playlist.");
    setOpenSignInDialog(true);
  };

  const hanleOpenSignInDialog3 = () => {
    setTitle("Need to report the video?");
    setContent("Sign in to report inappropriate content.");
    setOpenSignInDialog(true);
  };

  const handleCloseSignInDialog = () => {
    setOpenSignInDialog(false);
    setTitle("");
    setContent("");
  };

  return (
    <>
      <div className={classes.btnGroup}>
        <Button
          classes={{
            label: classes.label,
            startIcon: classes.startIcon,
            iconSizeMedium: classes.iconBtn,
          }}
          startIcon={<ThumbUpAltIcon />}
          onClick={!isAuthenticated ? hanleOpenSignInDialog0 : null}
        >
          3
        </Button>
        <Button
          classes={{
            label: classes.label,
            startIcon: classes.startIcon,
            iconSizeMedium: classes.iconBtn,
          }}
          startIcon={<ThumbDownAltIcon />}
          onClick={!isAuthenticated ? hanleOpenSignInDialog1 : null}
        >
          3
        </Button>
        <Button
          classes={{
            label: classes.label,
            startIcon: classes.startIcon,
            iconSizeMedium: classes.iconBtn2,
          }}
          startIcon={<ReplyIcon />}
        >
          Share
        </Button>
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
          title={title}
          content={content}
        />
      )}
    </>
  );
}
