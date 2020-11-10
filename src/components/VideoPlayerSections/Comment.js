import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

import ReplyComments from "./ReplyComments";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderTop: "1px solid hsla(0,0%,53.3%, .4 )",
    padding: theme.spacing(3, 2, 1, 2),
  },
  info: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  btn: {
    position: "relative",
    left: -8,
  },
  icongroup: {
    display: "flex",
    margin: theme.spacing(1, 0),
  },
  more: {
    marginLeft: "auto",
    padding: 6,
    position: "relative",
    right: -6,
  },
  like: {
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    position: "relative",
    left: -6,
  },
  dislike: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  avatar: {
    backgroundColor: "#00579c",
    marginTop: 4,
  },
  iconButton: {
    padding: 6,
  },
  menus: {
    padding: 0,
  },
  menuItem: {
    padding: theme.spacing(0, 3),
    minHeight: theme.spacing(5),
  },
}));

export default function Comment() {
  const classes = useStyles();
  const [showComment, setShowComment] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowComment = () => {
    setShowComment(true);
  };

  const handleOpenReply = () => {
    setShowReplyForm(true);
    setShowComment(true);
  };

  const handleOpenReplyComments = async () => {
    await handleClose();
    handleOpenReply();
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar} alt="avatar" src="" />
      <div className={classes.info}>
        <Typography color="textSecondary">
          Huan_Rose &#8226; 1days ago
        </Typography>
        <Typography variant="subtitle1" className={classes.comment}>
          Tu luc tui biet vê lê bao binh tui thich va nhung bai bat cua.binh rat
          rat la.hay va tinh cam.trong.cuoc song tui o biet noi sao
          day.noi.chung rat hay chuc binh thanh cong
        </Typography>
        <div className={classes.icongroup}>
          <div className={classes.like}>
            <IconButton className={classes.iconButton}>
              <ThumbUpAltIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2">345</Typography>
          </div>
          <div className={classes.dislike}>
            <IconButton className={classes.iconButton}>
              <ThumbDownAltIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2">345</Typography>
          </div>
          <div className={classes.dislike}>
            <IconButton
              className={classes.iconButton}
              onClick={handleOpenReply}
            >
              <CommentIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2">345</Typography>
          </div>
          <IconButton className={classes.more} onClick={handleMenu}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </div>
        {showComment ? (
          <ReplyComments showReplyForm={showReplyForm} />
        ) : (
          <Button
            onClick={handleShowComment}
            className={classes.btn}
            color="primary"
          >
            Show more replies
          </Button>
        )}

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
          classes={{ list: classes.menus }}
        >
          <MenuItem
            className={classes.menuItem}
            onClick={handleOpenReplyComments}
          >
            Reply
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            Report
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
