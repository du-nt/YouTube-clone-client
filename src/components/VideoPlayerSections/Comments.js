import React, { useState, useEffect, useRef } from 'react'
import { Typography } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux'
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";

import CommentItem from './CommentItem';
import SignInDialog from "./SignInDialog";

import { getComments, topSort, firstSort, addComment } from "../../slices/videoSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0)
  },
  sort: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: '1px 6px',
    marginLeft: theme.spacing(4)
  },
  input: {
    display: 'flex',
    margin: theme.spacing(3, 0)
  },
  form: {
    flex: 1,
    marginLeft: theme.spacing(2)
  },
  textField: {
    width: '100%',
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
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputAvatar: {
    backgroundColor: '#a0c2ff'
  },
  submitting: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(3, 0)
  },
}));

export default function Comments() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [isOpenCommentButton, setIsOpenCommentButton] = useState(false)
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const { commentsLoaded, _id, commentsCount, comments } = useSelector(
    (state) => state.video
  );

  const { user, isAuthenticated } = useSelector(state => state.auth);
  const letterAvatar = user?.displayName.charAt(0).toUpperCase();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleTopSort = () => {
    dispatch(topSort());
    setAnchorEl(null);
  };

  const handleFirstSort = () => {
    dispatch(firstSort());
    setAnchorEl(null);
  };

  const handleFocus = () => {
    if (!isAuthenticated) {
      inputRef.current.blur();
      setOpen(true);
    } else {
      setIsOpenCommentButton(true)
    }
  }

  const handleHideCommentButton = () => {
    setText("");
    setIsOpenCommentButton(false)
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    const newComment = text.trim();
    const resetFrom = () => {
      setText("");
      setSubmitting(false);
      setIsOpenCommentButton(false)
    };
    if (newComment) {
      setSubmitting(true);
      dispatch(addComment(_id, newComment, resetFrom));
    }
  }

  const handleChange = ({ target }) => {
    setText(target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    !commentsLoaded && dispatch(getComments(_id));
  }, [dispatch, commentsLoaded, _id]);

  return (
    <div className={classes.root}>
      <div className={classes.sort}>
        <Typography>{commentsCount} Comments</Typography>
        <Button
          className={classes.button}
          startIcon={<SortIcon />}
          onClick={handleMenu}
        >
          Sort by
        </Button>
      </div>
      {submitting ?
        <div className={classes.submitting}>
          <CircularProgress size={30} />
        </div>
        :
        <div className={classes.input}>
          <Avatar
            alt="Avatar"
            src={user?.avatar}
            className={classes.inputAvatar}
          >
            {letterAvatar}
          </Avatar>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={classes.form}
            noValidate
            autoComplete="off"
          >
            <TextField
              className={classes.textField}
              placeholder="Add a public comment..."
              onFocus={handleFocus}
              multiline
              value={text}
              onChange={handleChange}
              inputRef={inputRef}
            />
            {isOpenCommentButton && <div className={classes.inputBtn}>
              <Button onClick={handleHideCommentButton} className={classes.cancel}>Cancel</Button>
              <Button
                onClick={handleAddComment}
                variant="contained"
                color="primary"
                disabled={text.trim().length === 0}
              >
                Comment
              </Button>
            </div>}
          </form>
        </div>
      }

      {commentsLoaded ? (
        comments.map((comment, index) => (
          <CommentItem key={index} item={comment} />
        ))
      ) : (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
        open={openMenu}
        onClose={handleCloseMenu}
        classes={{ list: classes.menus }}
      >
        <MenuItem onClick={handleTopSort}>Top comments</MenuItem>
        <MenuItem onClick={handleFirstSort}>Newest first</MenuItem>
      </Menu>

      {open && (
        <SignInDialog
          openSignInDialog={open}
          handleCloseSignInDialog={handleClose}
          title="Want to comment on this video?"
          content="Sign in to add your comment."
        />
      )}

    </div>
  )
}
