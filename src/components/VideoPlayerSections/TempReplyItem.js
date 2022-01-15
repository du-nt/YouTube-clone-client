import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import moment from "moment";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import { TextField } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";

import SignInDialog from "./SignInDialog";

import { useHover } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteTempReply,
  addTempReply,
  likeTempReply,
  dislikeTempReply,
} from "../../slices/videoSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    marginTop: theme.spacing(1.5)
  },
  user: {
    fontWeight: 500,
    textDecoration: 'none',
    color: 'inherit',
  },
  avatar: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(2),
    width: theme.spacing(3.3),
    height: theme.spacing(3.3),
    fontSize: 16,
    textDecoration: 'none',
  },
  btnGroups: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    left: theme.spacing(-1)
  },
  likesCount: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  smallButton: {
    fontSize: "0.8rem",
    padding: theme.spacing(1)
  },
  smallIcon: {
    width: theme.spacing(2.2),
    height: theme.spacing(2.2),
  },
  replyInput: {
    display: 'flex',
  },
  form: {
    flex: 1,
    marginLeft: theme.spacing(2)
  },
  textField: {
    width: '100%',
  },
  viewReply: {
    display: 'flex',
    alignItems: 'center',
    color: '#065fd4'
  },
  more: {
    padding: theme.spacing(1),
    position: 'absolute',
    right: 0,
    top: 0,
  },
  reply: {
    paddingRight: theme.spacing(5),
    flex: 1,
  },
  inputBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1)
  },
  cancel: {
    marginRight: theme.spacing(1)
  },
  replyBtn: {
    textTransform: "uppercase",
    marginLeft: theme.spacing(1),
    cursor: "pointer",
    fontWeight: 500,
    color: '#6e6e6e'
  },
  inputAvatar: {
    width: theme.spacing(3.3),
    height: theme.spacing(3.3),
  },
  mentions: {
    backgroundColor: "#e3e3e3",
    borderRadius: "2px",
    padding: "1px 2px 1px 0px",
    marginLeft: "-1px",
  },
  submitting: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(3, 0)
  },
}));

export default function TempReplyItem({ reply }) {
  const classes = useStyles();
  const replyRef = useRef(null);
  const isHover = useHover(replyRef);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);
  const [isShowReplyInput, setIsShowReplyInput] = useState(false);

  const {
    _id,
    author,
    text,
    createdAt,
    likesCount,
    dislikesCount,
    commentId,
    isLiked,
    isDisliked,
  } = reply;
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const time = moment(createdAt).fromNow();
  const letterAvatar = author.displayName.charAt(0).toUpperCase();
  const loggedUserletterAvatar = user?.displayName.charAt(0).toUpperCase();

  const handleChange = ({ target }) => {
    setComment(target.value);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = () => {
    dispatch(deleteTempReply(reply));
    setAnchorEl(null);
  };

  const handleLike = () => {
    isAuthenticated
      ? dispatch(likeTempReply(_id, commentId))
      : setOpenSignInDialog(true);
  };

  const handleDislike = () => {
    isAuthenticated
      ? dispatch(dislikeTempReply(_id, commentId))
      : setOpenSignInDialog(true);
  };

  const handleCloseSignInDialog = () => {
    setOpenSignInDialog(false);
  };

  const handleOpenReply = () => {
    if (!isAuthenticated) {
      setOpenSignInDialog(true);
    } else {
      isShowReplyInput ? inputRef.current.focus() : setIsShowReplyInput(true)
    }
  };

  const handleHideReplyInput = () => {
    setComment("");
    setIsShowReplyInput(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = comment.trim();
    const resetForm = () => {
      setComment("");
      setIsShowReplyInput(false)
      setSubmitting(false);
    };

    if (text) {
      setSubmitting(true);
      const replyData = { _id: commentId, text };
      dispatch(addTempReply(replyData, resetForm));
    }
  };

  return (
    <div className={classes.root} ref={replyRef}>
      <Avatar
        component={NavLink}
        to={`/channel/${author._id}`}
        className={classes.avatar}
        alt="Avatar"
        src={author.avatar}
      >
        {letterAvatar}
      </Avatar>
      <div className={classes.reply}>
        <div>
          <Typography
            component={NavLink}
            to={`/channel/${author._id}`}
            className={classes.user}
            variant="body1"
          >
            {author.displayName}
          </Typography>
          <span>   </span>
          <Typography variant="body2" component='span'>{time}</Typography>
        </div>
        <Typography>{text}</Typography>
        <div className={classes.btnGroups}>
          <div className={classes.likesCount}>
            <IconButton onClick={handleLike} className={classes.smallButton} >
              {isLiked ? <ThumbUpAltIcon className={classes.smallIcon} /> : <ThumbUpAltOutlinedIcon className={classes.smallIcon} />}
            </IconButton>
            {likesCount > 0 && <Typography>{likesCount}</Typography>}
          </div>
          <div className={classes.likesCount}>
            <IconButton onClick={handleDislike} className={classes.smallButton} >
              {isDisliked ? <ThumbDownIcon className={classes.smallIcon} /> : <ThumbDownAltOutlinedIcon className={classes.smallIcon} />}
            </IconButton>
            {dislikesCount > 0 && <Typography>{dislikesCount}</Typography>}
          </div>
          <Typography
            onClick={handleOpenReply}
            className={classes.replyBtn}
            variant="body2"
          >
            Reply
          </Typography>
        </div>

        {submitting ? <div className={classes.submitting}>
          <CircularProgress size={30} />
        </div>
          :
          isShowReplyInput && <div className={classes.replyInput}>
            <Avatar
              alt="avatar"
              src={author?.avatar}
              className={classes.inputAvatar}
            >
              {loggedUserletterAvatar}
            </Avatar>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={(e) => e.preventDefault()}
            >
              <TextField
                inputRef={inputRef}
                autoFocus
                className={classes.textField}
                placeholder="Add a public reply..."
                value={comment}
                onChange={handleChange}
                multiline
              />
              <div className={classes.inputBtn}>
                <Button onClick={handleHideReplyInput} className={classes.cancel}>Cancel</Button>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  disabled={comment.trim().length === 0}
                >
                  Reply
                </Button>
              </div>
            </form>
          </div>
        }
      </div>

      {(isHover || open) && isAuthenticated && <IconButton onClick={handleMenu} className={classes.more}>
        <MoreVertIcon />
      </IconButton>}

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={open}
        getContentAnchorEl={null}
        onClose={handleClose}
      >
        {user?._id === author._id ?
          <MenuItem
            onClick={handleDeleteComment}
          >
            <ListItemIcon >
              <DeleteOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
          :
          <MenuItem onClick={handleClose}>
            <ListItemIcon >
              <FlagOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </MenuItem>
        }
      </Menu>

      {openSignInDialog && (
        <SignInDialog
          openSignInDialog={openSignInDialog}
          handleCloseSignInDialog={handleCloseSignInDialog}
          title="Want to act on this comment?"
          content="Please sign in to do it."
        />
      )}

    </div>
  )
}
