import React, { useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";

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
  const inputRef = useRef(null);

  useEffect(() => {
    focus && inputRef.current.focus();
  }, [focus]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar} alt="avatar" src="" />
      <CommentCssTextField
        inputRef={inputRef}
        className={classes.input}
        variant="outlined"
        multiline
        rowsMax={3}
        placeholder="Add a public comment..."
      />
      <IconButton>
        <SendIcon color="primary" />
      </IconButton>
    </div>
  );
}