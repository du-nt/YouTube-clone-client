import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import TextField from '@material-ui/core/TextField';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import { NavLink } from 'react-router-dom';

import ReplyItem from './ReplyItem'
import SignInDialog from "./SignInDialog";
import TempReplyItem from "./TempReplyItem";

import { useHover } from '../../hooks'

import {
  getReplies,
  deleteComment,
  likeComment,
  dislikeComment,
  addTempReply
} from "../../slices/videoSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    marginTop: theme.spacing(2.5)
  },
  body: {
    paddingRight: theme.spacing(5),
    flex: 1,
  },
  user: {
    fontWeight: 500,
    textDecoration: 'none',
    color: 'inherit',
  },
  avatar: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(2),
    textDecoration: 'none',
  },
  btnGroups: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    left: theme.spacing(-1)
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
    display: 'inline-flex',
    alignItems: 'center',
    color: '#065fd4',
    cursor: 'pointer',
    position: 'relative',
    left: -7
  },
  more: {
    padding: theme.spacing(1),
    position: 'absolute',
    right: 0,
    top: 0,
  },
  replyPart: {
    marginLeft: theme.spacing(7)
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
  likesCount: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  smallButton: {
    fontSize: "0.8rem",
    padding: theme.spacing(1)
  },
  smallIcon: {
    width: theme.spacing(2.2),
    height: theme.spacing(2.2),
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
  submitting: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(3, 0)
  },
}));

export default function CommentItem({ item }) {
  const classes = useStyles();
  const commentRef = useRef(null);
  const inputRef = useRef(null);
  const isHover = useHover(commentRef);
  const dispatch = useDispatch();
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowReplyInput, setIsShowReplyInput] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

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
    isLiked,
    isDisliked,
    temReplies
  } = item;

  const letterAvatar = author.displayName.charAt(0).toUpperCase();
  const loggedUserletterAvatar = user?.displayName.charAt(0).toUpperCase();
  const time = moment(createdAt).fromNow();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = ({ target }) => {
    setComment(target.value);
  };

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
      const replyData = { _id, text };
      dispatch(addTempReply(replyData, resetForm));
    }
  };

  const handleLike = () => {
    isAuthenticated ? dispatch(likeComment(_id)) : setOpenSignInDialog(true);
  };

  const handleDislike = () => {
    isAuthenticated ? dispatch(dislikeComment(_id)) : setOpenSignInDialog(true);
  };

  const handleShowComment = () => {
    setShowComment(true);
    commentsCount > 0 && !isLoaded && setLoading(true);
  };

  const handleCloseSignInDialog = () => {
    setOpenSignInDialog(false);
  };

  const handleHideComment = () => {
    setShowComment(false);
  };

  const handleShowReplyInput = () => {
    if (!isAuthenticated) {
      setOpenSignInDialog(true);
    } else {
      isShowReplyInput ? inputRef.current.focus() : setIsShowReplyInput(true)
    }
  }

  const handleHideReplyInput = () => {
    setComment("");
    setIsShowReplyInput(false)
  }

  const handleDeleteComment = () => {
    dispatch(deleteComment(_id));
    setAnchorEl(null);
  };

  useEffect(() => {
    loading && dispatch(getReplies(_id, setLoading));
  }, [dispatch, loading, _id]);


  return (
    <>
      <div className={classes.root} ref={commentRef}>
        <Avatar
          component={NavLink}
          to={`/channel/${author._id}`}
          className={classes.avatar}
          alt="avatar"
          src={author.avatar}
        >
          {letterAvatar}
        </Avatar>
        <div className={classes.body}>
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
              <IconButton className={classes.smallButton} onClick={handleLike}>
                {isLiked ? <ThumbUpAltIcon className={classes.smallIcon} /> : <ThumbUpAltOutlinedIcon className={classes.smallIcon} />}
              </IconButton>
              {likesCount > 0 && <Typography>{likesCount}</Typography>}
            </div>
            <div className={classes.likesCount}>
              <IconButton className={classes.smallButton} onClick={handleDislike}>
                {isDisliked ? <ThumbDownIcon className={classes.smallIcon} /> : <ThumbDownAltOutlinedIcon className={classes.smallIcon} />}
              </IconButton>
              {dislikesCount > 0 && <Typography>{dislikesCount}</Typography>}
            </div>
            <Typography
              onClick={handleShowReplyInput}
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
            isShowReplyInput &&
            <div className={classes.replyInput}>
              <Avatar
                alt="Avatar"
                src={user?.avatar}
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
            </div>}
        </div>

        {(isHover || open) && isAuthenticated && <IconButton onClick={handleMenu} className={classes.more}>
          <MoreVertIcon />
        </IconButton>}
      </div>

      <div className={classes.replyPart}>
        {commentsCount > 0 ? (
          showComment ? (
            <>
              <div className={classes.viewReply} onClick={handleHideComment} >
                <ArrowDropUpIcon />
                <Typography variant="subtitle2">Hide reply</Typography>
              </div>
              {loading ? (
                <div className={classes.loading}>
                  <CircularProgress />
                </div>
              ) : (
                replies.map((reply, index) => (
                  <ReplyItem key={index} reply={reply} />
                ))
              )}
            </>
          ) :
            <div className={classes.viewReply} onClick={handleShowComment}>
              <ArrowDropDownIcon />
              <Typography variant="subtitle2" >View {commentsCount} replies</Typography>
            </div>

        ) : null}

        {temReplies?.length > 0 && temReplies.map((reply, index) => (
          <TempReplyItem key={index} reply={reply} />
        ))
        }
      </div>

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

    </>
  )
}
