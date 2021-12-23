import React from "react";

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import HistoryIcon from "@material-ui/icons/History";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import WatchLaterIcon from "@material-ui/icons/WatchLater";

import PlayList from "./PlayList";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  part2: {
    borderBottom: "none",
  },
  menuList: {
    padding: 0,
  },
  menuItem: {
    padding: "19px 16px",
  },
  playlists: {
    padding: theme.spacing(1.5, 3, 0.5, 3),
  },
  nothing: {
    textAlign: "center",
    marginTop: 100,
    color: "#b7b7b7",
  },
}));

export default function Log() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);

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
          <MenuItem
            className={classes.menuItem}
            component={NavLink}
            to={`/channel/${user._id}/videos`}
          >
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
      </Paper>

      <Paper variant="outlined" square className={classes.part2}>
        <Typography className={classes.playlists} variant="body2">
          Playlists
        </Typography>
        <PlayList />
      </Paper>
    </div>
  );
}
