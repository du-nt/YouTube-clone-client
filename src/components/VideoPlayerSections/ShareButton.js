import * as React from "react";
import webShare from "react-web-share-api";
import ReplyIcon from "@material-ui/icons/Reply";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
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
  iconBtn2: {
    "& > *": {
      fontSize: "28px !important",
      transform: "rotateY(180deg)",
    },
  },
}));

function ShareButton({ share, isSupported }) {
  const classes = useStyles();

  const handleError = () => {
    toast.error("Your browser is not currently supported", {
      autoClose: 2000,
      closeButton: false,
    });
  };

  return (
    <Button
      classes={{
        label: classes.label,
        startIcon: classes.startIcon,
        iconSizeMedium: classes.iconBtn2,
      }}
      onClick={isSupported ? share : handleError}
      startIcon={<ReplyIcon />}
    >
      Share
    </Button>
  );
}

export default webShare()(ShareButton);
