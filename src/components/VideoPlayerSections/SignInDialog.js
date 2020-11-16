import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles, Typography } from "@material-ui/core";
import { NavLink, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  contentText: {
    margin: 0,
  },
  title: {
    fontWeight: 400,
    fontSize: "1.1rem",
    padding: theme.spacing(2, 3, 0, 3),
  },
  action: {
    paddingTop: 0,
  },
  btn: {
    color: "hsla(0,0%,6.7%, .6 )",
  },
}));

export default function SignInDialog({
  openSignInDialog,
  handleCloseSignInDialog,
  title,
  content,
}) {
  const location = useLocation();
  const classes = useStyles();

  const handleCloseModal = () => {
    handleCloseSignInDialog();
  };

  return (
    <Dialog open={openSignInDialog} onClose={handleCloseModal}>
      <Typography className={classes.title}>{title}</Typography>
      <DialogContent>
        <DialogContentText className={classes.contentText} variant="body2">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions classes={{ root: classes.action }}>
        <Button className={classes.btn} onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          component={NavLink}
          to={{ pathname: "/login", state: { from: location.pathname } }}
          color="secondary"
        >
          Sign in
        </Button>
      </DialogActions>
    </Dialog>
  );
}
