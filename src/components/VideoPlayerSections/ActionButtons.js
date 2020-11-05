import React from "react";
import { makeStyles } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ReplyIcon from "@material-ui/icons/Reply";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import FlagIcon from "@material-ui/icons/Flag";
import Button from "@material-ui/core/Button";

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

  return (
    <div className={classes.btnGroup}>
      <Button
        classes={{
          label: classes.label,
          startIcon: classes.startIcon,
          iconSizeMedium: classes.iconBtn,
        }}
        startIcon={<ThumbUpAltIcon />}
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
      >
        Report
      </Button>
    </div>
  );
}
