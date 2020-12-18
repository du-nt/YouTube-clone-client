import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useDispatch } from "react-redux";

import { addReply } from "../../slices/videoSlice";

export default function ReplyForm({ _id, open, handleCloseReply }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    setComment(target.value);
  };

  const handleClose = () => {
    handleCloseReply();
  };

  const handleSubmit = () => {
    const text = comment.trim();
    const replyData = { _id, text };
    dispatch(addReply(replyData));
    handleCloseReply();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <TextField
          margin="dense"
          type="text"
          autoComplete="off"
          placeholder="Add a public reply..."
          fullWidth
          value={comment}
          onChange={handleChange}
          autoFocus
          multiline
          rowsMax={3}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Reply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
