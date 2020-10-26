import React from "react";

import MenuList from "@material-ui/core/MenuList";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";
import SecurityIcon from "@material-ui/icons/Security";
import FeedbackIcon from "@material-ui/icons/Feedback";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  part2: {
    flex: 1,
    borderBottom: "none",
  },
  menuList: {
    padding: 0,
  },
  menuItem: {
    padding: "19px 16px",
  },
  botText: {
    backgroundColor: "#fff",
    marginBottom: theme.spacing(1),
  },
  close: {
    cursor: "pointer",
  },
}));

export default function Menu({ closeMenu }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square>
        <List disablePadding>
          <ListItem>
            <ListItemAvatar>
              <CloseIcon
                className={classes.close}
                onClick={() => closeMenu()}
              />
            </ListItemAvatar>
            <ListItemText primary="Account" />
          </ListItem>
        </List>
      </Paper>
      <Paper variant="outlined" square className={classes.part2}>
        <MenuList className={classes.menuList}>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <Typography variant="inherit">Sign in</Typography>
          </MenuItem>
          <Divider />
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Settings
            </Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Your data in YouTube
            </Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Feedback
            </Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Help
            </Typography>
          </MenuItem>
        </MenuList>
      </Paper>
      <Typography align="center" variant="caption" className={classes.botText}>
        Privacy Policy • Terms of Service
      </Typography>
    </div>
  );
}
