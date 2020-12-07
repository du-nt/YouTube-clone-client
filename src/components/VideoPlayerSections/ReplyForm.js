import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

export default function ReplyForm({
  open,
  comment,
  handleChange,
  handleCloseReply,
}) {
  const handleClose = () => {
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} color="primary">
          Reply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
