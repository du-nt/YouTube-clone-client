import React from "react";

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
  menuList: {
    padding: 0,
    width: 255,
  },
}));

export default function Modal({ open, handleClose }) {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose}>
      <MenuList className={classes.menuList}>
        <MenuItem>Channels</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem>Search</MenuItem>
        <MenuItem onClick={() => handleClose()}>Cancel</MenuItem>
      </MenuList>
    </Dialog>
  );
}
