import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TuneIcon from "@material-ui/icons/Tune";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";

import AddComment from "./AddComment";
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: "199 !important",
    top: (playerHeight) => `${playerHeight}px !important`,
  },
  scrollPaper: {
    alignItems: "flex-end",
  },
  appBar: {
    paddingLeft: theme.spacing(2),
  },
  left: {
    flex: 1,
    display: "flex",
  },
  title: {
    fontWeight: 400,
  },
  order: {
    marginRight: theme.spacing(2),
  },
  commentsCount: {
    marginLeft: theme.spacing(2),
    fontWeight: 400,
  },
  menus: {
    padding: 0,
  },
  close: { marginRight: theme.spacing(0.5) },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CommentsDialog({
  focus,
  playerHeight,
  open,
  closeComments,
}) {
  const classes = useStyles(playerHeight);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    closeComments();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const menu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={openMenu}
      onClose={handleCloseMenu}
      classes={{ list: classes.menus }}
    >
      <MenuItem onClick={handleCloseMenu}>Top comments</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Newest first</MenuItem>
    </Menu>
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      classes={{ root: classes.root, scrollPaper: classes.scrollPaper }}
    >
      <AppBar position="sticky" color="inherit" className={classes.appBar}>
        <Toolbar disableGutters>
          <div className={classes.left}>
            <Typography variant="subtitle1" className={classes.title}>
              Comments
            </Typography>
            <Typography variant="subtitle1" className={classes.commentsCount}>
              234
            </Typography>
          </div>
          <IconButton
            onClick={handleMenu}
            aria-label="order"
            aria-controls="menu-appbadr"
            aria-haspopup="true"
            className={classes.order}
          >
            <TuneIcon />
          </IconButton>
          <IconButton
            className={classes.close}
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <AddComment focus={focus} />
      <Comment />
      <Comment />

      {menu}
    </Dialog>
  );
}
