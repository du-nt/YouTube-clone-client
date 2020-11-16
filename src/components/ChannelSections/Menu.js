import React from "react";

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuList: {
    padding: 0,
    width: 255,
  },
}));

export default function Menu({ closeMenu }) {
  const classes = useStyles();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <Paper variant="outlined">
      <MenuList className={classes.menuList}>
        {!isAuthenticated && (
          <MenuItem
            component={NavLink}
            to={{ pathname: "/login", state: { from: location.pathname } }}
          >
            Sign In
          </MenuItem>
        )}
        <MenuItem>Settings</MenuItem>
        <MenuItem>Your data in YouTube</MenuItem>
        <MenuItem>Feedback</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem onClick={() => closeMenu()}>Cancel</MenuItem>
      </MenuList>
    </Paper>
  );
}
