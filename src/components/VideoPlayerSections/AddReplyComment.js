import React, { useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ReplyIcon from "@material-ui/icons/Reply";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 2,
    borderBottom: "1px solid #cfcfcf",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    margin: theme.spacing(0, 0.5, 0, 2),
  },
  avatar: {
    backgroundColor: "#00579c",
    width: theme.spacing(3.3),
    height: theme.spacing(3.3),
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

export default function AddReplyComment() {
  const inputReplyRef = useRef(null);

  useEffect(() => {
    inputReplyRef.current.focus();
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar} alt="avatar" src="" />
      <CommentCssTextField
        inputRef={inputReplyRef}
        className={classes.input}
        variant="outlined"
        multiline
        rowsMax={3}
        placeholder="Add a public reply..."
      />
      <IconButton>
        <ReplyIcon color="primary" />
      </IconButton>
    </div>
  );
}
