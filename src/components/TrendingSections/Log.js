import React from "react";

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import HistoryIcon from "@material-ui/icons/History";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import WatchLaterIcon from "@material-ui/icons/WatchLater";

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
}));

export default function Log() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square className={classes.part2}>
        <MenuList className={classes.menuList}>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <Typography variant="inherit">History</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <OndemandVideoIcon />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Your videos
            </Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <LocalOfferIcon />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Your movies and shows
            </Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <WatchLaterIcon />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Watch later
            </Typography>
          </MenuItem>
        </MenuList>
        <Divider />
      </Paper>
    </div>
  );
}
