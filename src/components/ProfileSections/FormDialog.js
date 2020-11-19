import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(0, 0, 3, 0),
  },
}));

export default function FormDialog({ open, handleCloseForm }) {
  const classes = useStyles();

  const handleClose = () => {
    handleCloseForm();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <TextField
          autoFocus
          autoComplete="off"
          margin="dense"
          id="name"
          label="Your name"
          type="text"
          fullWidth
          className={classes.input}
        />
        <DialogContentText variant="body2">
          3 name changes allowed every 90 days. <span> </span>
          <Typography variant="body2" color="primary" component="span">
            Learn more
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
