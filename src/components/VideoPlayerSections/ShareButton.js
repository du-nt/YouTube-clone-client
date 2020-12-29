import React, { useState } from "react";
import webShare from "react-web-share-api";
import ReplyIcon from "@material-ui/icons/Reply";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LineShareButton,
  LineIcon,
} from "react-share";
import { useSelector } from "react-redux";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(0.5, 0, 0, 2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    color: theme.palette.grey[500],
  },
});

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
  url: {
    color: "#030303",
    wordBreak: "break-all",
    marginBottom: theme.spacing(0.5),
    textAlign: "center",
  },
  btn: {
    display: "flex",
    overflow: "scroll",
    "&::after": {
      content: "''",
      width: 0.1,
      flexShrink: 0,
    },
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgb(250 250 250)",
    border: "1px solid rgb(237 237 237)",
    borderRadius: 2,
    padding: theme.spacing(1, 1.5),
    margin: theme.spacing(1, 0),
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function ShareButton({ share, isSupported }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { title } = useSelector((state) => state.video);
  const shareUrl = window.location.href;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);

    toast.dark("Link copied to clipboard", {
      autoClose: 2000,
      closeButton: false,
      className: "yy",
    });
  };

  return (
    <>
      <Button
        classes={{
          label: classes.label,
          startIcon: classes.startIcon,
          iconSizeMedium: classes.iconBtn2,
        }}
        onClick={isSupported ? share : handleClickOpen}
        startIcon={<ReplyIcon />}
      >
        Share
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle onClose={handleClose}>Share</DialogTitle>
        <DialogContent>
          <div className={classes.btn}>
            <FacebookShareButton
              className="iconShare"
              url={shareUrl}
              title={title}
            >
              <FacebookIcon size={50} round={true} />
              <Typography variant="body2">Facebook</Typography>
            </FacebookShareButton>
            <TwitterShareButton
              className="iconShare"
              url={shareUrl}
              title={title}
            >
              <TwitterIcon size={50} round={true} />
              <Typography variant="body2">Twitter</Typography>
            </TwitterShareButton>
            <EmailShareButton
              className="iconShare"
              url={shareUrl}
              title={title}
            >
              <EmailIcon size={50} round={true} />
              <Typography variant="body2">Email</Typography>
            </EmailShareButton>
            <TelegramShareButton
              className="iconShare"
              url={shareUrl}
              title={title}
            >
              <TelegramIcon size={50} round={true} />
              <Typography variant="body2">Telegram</Typography>
            </TelegramShareButton>
            <WhatsappShareButton
              className="iconShare"
              url={shareUrl}
              title={title}
            >
              <WhatsappIcon size={50} round={true} />
              <Typography variant="body2">Whatsapp</Typography>
            </WhatsappShareButton>
            <LineShareButton className="iconShare" url={shareUrl} title={title}>
              <LineIcon size={50} round={true} />
              <Typography variant="body2">Line</Typography>
            </LineShareButton>
          </div>
          <div className={classes.copy}>
            <Typography className={classes.url}>{shareUrl}</Typography>
            <Button
              color="primary"
              onClick={copyToClipboard}
              variant="outlined"
            >
              Copy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default webShare()(ShareButton);
