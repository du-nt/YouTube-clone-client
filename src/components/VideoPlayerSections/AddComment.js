import React, { useEffect, useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";

import SignInDialog from "./SignInDialog";

import { addComment } from "../../slices/videoSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2, 0.5, 2, 2),
  },
  input: {
    flex: 1,
    margin: theme.spacing(0, 0.5, 0, 2),
  },
  avatar: {
    backgroundColor: "#00579c",
  },
  btn: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(0.5),
  },
  submitting: {
    marginRight: theme.spacing(1.5),
  },
}));

const CommentCssTextField = withStyles({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    flex: 1,
    border: "none",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
    "& .MuiOutlinedInput-multiline": {
      padding: 0,
    },
  },
})(TextField);

export default function AddComment({ focus }) {
  const classes = useStyles();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [text, setText] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { _id } = useSelector((state) => state.video);
  const letterAvatar = user && user.displayName.charAt(0).toUpperCase();
  const visible = text.trim();

  const handleClick = () => {
    if (!isAuthenticated) {
      inputRef.current.blur();
      setOpen(true);
    }
  };

  const handleChange = ({ target }) => {
    setText(target.value);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const newComment = text.trim();
    const resetFrom = () => {
      setText("");
      setSubmitting(false);
    };
    dispatch(addComment(_id, newComment, resetFrom));
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    focus && inputRef.current.focus();
  }, [focus]);

  return (
    <>
      <div className={classes.root}>
        {isAuthenticated ? (
          <Avatar className={classes.avatar} alt="avatar" src={user.avatar}>
            {letterAvatar}
          </Avatar>
        ) : (
          <Avatar className={classes.avatar} />
        )}
        <CommentCssTextField
          className={classes.input}
          inputRef={inputRef}
          variant="outlined"
          multiline
          rowsMax={3}
          placeholder="Add a public comment..."
          onFocus={handleClick}
          value={text}
          onChange={handleChange}
        />
        {visible ? (
          submitting ? (
            <CircularProgress size={30} className={classes.submitting} />
          ) : (
            <IconButton onClick={handleSubmit} className={classes.btn}>
              <SendIcon color="primary" />
            </IconButton>
          )
        ) : null}
      </div>

      {open && (
        <SignInDialog
          openSignInDialog={open}
          handleCloseSignInDialog={handleClose}
          title="Want to comment on this video?"
          content="Sign in to add your comment."
        />
      )}
    </>
  );
}
