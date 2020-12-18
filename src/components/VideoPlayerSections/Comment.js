import React, { useState, useEffect } from "react";
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
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ReplyComment from "./ReplyComment";
import ReplyForm from "./ReplyForm";
import SignInDialog from "./SignInDialog";

import { getReplies, deleteComment } from "../../slices/videoSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderTop: "1px solid hsl(0deg 0% 53% / 13%)",
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
    marginRight: 18,
    position: "relative",
    left: -6,
  },
  dislike: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(3),
  },
  avatar: {
    backgroundColor: "#00579c",
    marginTop: 4,
    textDecoration: "none",
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
  name: {
    backgroundColor: "#9e9e9e",
    color: "#fff",
    padding: "1px 8px",
    borderRadius: 50,
  },
  spin: {
    margin: theme.spacing(1, 0, 1, 8),
    height: 88,
    display: "flex",
    alignItems: "center",
  },
}));

export default function Comment({ item }) {
  const classes = useStyles();
  const [openForm, setOpenForm] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const {
    _id,
    author,
    createdAt,
    text,
    likesCount,
    dislikesCount,
    commentsCount,
    replies,
    isLoaded,
  } = item;
  const letterAvatar = author.displayName.charAt(0).toUpperCase();
  const time = moment(createdAt).fromNow();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loading && dispatch(getReplies(_id, setLoading));
  }, [dispatch, loading, _id]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleShowComment = () => {
    if (!showComment) {
      setShowComment(true);
      commentsCount > 0 && !isLoaded && setLoading(true);
    }
  };

  const handleHideComment = () => {
    setShowComment(false);
  };

  const handleOpenReply = () => {
    if (isAuthenticated) {
      handleShowComment();
      setOpenForm(true);
    } else setOpenSignInDialog(true);
  };

  const handleCloseSignInDialog = () => {
    setOpenSignInDialog(false);
  };

  const handleCloseReply = () => {
    setOpenForm(false);
  };

  const handleOpenReplyComments = () => {
    setAnchorEl(null);
    handleOpenReply();
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment(_id));
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Avatar
        component={NavLink}
        to={`/channel/${author.userName}`}
        className={classes.avatar}
        alt="avatar"
        src={author.avatar}
      >
        {letterAvatar}
      </Avatar>
      <div className={classes.info}>
        <Typography color="textSecondary">
          <Typography component="span" className={classes.name}>
            {author.displayName}
          </Typography>
          <Typography component="span"> &#8226; {time}</Typography>
        </Typography>
        <Typography variant="subtitle1" className={classes.comment}>
          {text}
        </Typography>
        <div className={classes.icongroup}>
          <div className={classes.like}>
            <IconButton className={classes.iconButton}>
              <ThumbUpAltIcon fontSize="small" />
            </IconButton>
            {likesCount > 0 && (
              <Typography variant="body2">{likesCount}</Typography>
            )}
          </div>
          <div className={classes.dislike}>
            <IconButton className={classes.iconButton}>
              <ThumbDownAltIcon fontSize="small" />
            </IconButton>
            {dislikesCount > 0 && (
              <Typography variant="body2">{dislikesCount}</Typography>
            )}
          </div>
          <div className={classes.dislike}>
            <IconButton
              className={classes.iconButton}
              onClick={handleOpenReply}
            >
              <CommentIcon fontSize="small" />
            </IconButton>
            {commentsCount > 0 && (
              <Typography variant="body2">{commentsCount}</Typography>
            )}
          </div>
          <IconButton className={classes.more} onClick={handleMenu}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </div>

        {commentsCount > 0 ? (
          showComment ? (
            <>
              <Button
                onClick={handleHideComment}
                className={classes.btn}
                color="primary"
                startIcon={<ArrowDropUpIcon />}
              >
                Hide replies
              </Button>
              {loading ? (
                <div className={classes.spin}>
                  <CircularProgress />
                </div>
              ) : (
                replies.map((reply, index) => (
                  <ReplyComment key={index} reply={reply} />
                ))
              )}
            </>
          ) : (
            <Button
              onClick={handleShowComment}
              className={classes.btn}
              color="primary"
              startIcon={<ArrowDropDownIcon />}
            >
              Show {commentsCount} replies
            </Button>
          )
        ) : null}

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
          {user?._id === author._id && (
            <MenuItem
              className={classes.menuItem}
              onClick={handleDeleteComment}
            >
              Delete
            </MenuItem>
          )}
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            Report
          </MenuItem>
        </Menu>

        {openForm && (
          <ReplyForm
            _id={_id}
            open={openForm}
            handleCloseReply={handleCloseReply}
          />
        )}

        {openSignInDialog && (
          <SignInDialog
            openSignInDialog={openSignInDialog}
            handleCloseSignInDialog={handleCloseSignInDialog}
            title="Want to act on this comment?"
            content="Please sign in to do it."
          />
        )}
      </div>
    </div>
  );
}
