import React, { useState } from "react";
import { makeStyles, Typography, Link } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ReplyIcon from "@material-ui/icons/Reply";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import FlagIcon from "@material-ui/icons/Flag";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(0, 1.5),
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
    cursor: "pointer",
  },
  btnGroup: {
    margin: theme.spacing(0, 1.5),
    marginBottom: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
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
  text: {
    lineHeight: "normal",
    wordBreak: "break-word",
    fontWeight: 400,
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
}));

function ActionBar() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  const isSub = true;

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleOpenMadal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className={classes.title} onClick={handleOpen}>
        <div>
          <Typography className={classes.text} variant="h6">
            hellossssssssssssssssssssssssss
          </Typography>
          <Typography variant="caption" className={classes.view}>
            222K view
          </Typography>
        </div>
        <ExpandMoreIcon className={classes.moreicon} />
      </div>

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
      <Divider />
      <div className={classes.info}>
        <Link
          color="inherit"
          underline="none"
          component={NavLink}
          to="/"
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
        {!isSub ? (
          <Button color="secondary">Subscribe</Button>
        ) : (
          <Button onClick={handleOpenMadal} className={classes.btn}>
            Subscribed
          </Button>
        )}
      </div>
      {open && (
        <div className={classes.discription}>
          <Typography variant="body2">
            Huấn Hoa Hồng cover Anh chẳng sao mà quá tuyệt #HuấnHoaHồng
            #AnhChẳngSaoMà
          </Typography>
          <Typography variant="body2">
            Music: Anh Chẳng Sao Mà (KHANG VIET) Cover Huấn Hoa Hồng
          </Typography>
        </div>
      )}
      {openModal && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent className={classes.content}>
            <DialogContentText
              className={classes.contentText}
              variant="caption"
            >
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
    </div>
  );
}

export default ActionBar;
