import React from "react";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
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
import Divider from "@material-ui/core/Divider";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import YouTubeIcon from "@material-ui/icons/YouTube";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Menu from "@material-ui/core/Menu";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../slices/authSlice";
import { useHistory, NavLink } from "react-router-dom";

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
  personal: {
    display: "flex",
    padding: "16px 13px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 13,
    color: "#111",
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    backgroundColor: "#00579c",
    marginTop: 5,
    fontSize: 26,
  },
  link: {
    marginTop: 6,
  },
  upload: {
    position: "absolute",
    bottom: 150,
    right: 50,
  },
  displayName: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
    alignSelf: "baseline",
  },
  menus: {
    padding: 0,
  },
}));

export default function LoggedMenu({ closeMenu }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const auth = true;

  const { user } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(logout(history, closeMenu));
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToUpload = () => {
    history.push("/upload");
  };

  const goUpload = () => {
    setAnchorEl(null);
    history.push("/upload");
  };

  const goAdminUpload = () => {
    setAnchorEl(null);
    history.push("/admin/upload");
  };

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
      <Divider />
      <div className={classes.personal}>
        <Avatar
          onClick={() => closeMenu()}
          component={NavLink}
          to="/channel/dfd"
          alt="avatar"
          src={user.avatar}
          className={classes.large}
        >
          {user.displayName.charAt(0).toUpperCase()}
        </Avatar>
        <div className={classes.info}>
          <div className={classes.displayName}>
            <Link
              variant="subtitle1"
              underline="none"
              color="inherit"
              onClick={() => closeMenu()}
              component={NavLink}
              to="/channel/dfd"
            >
              {user.displayName}
            </Link>
            <KeyboardArrowDownIcon className={classes.icon} />
          </div>
          <Typography>{user.email}</Typography>
          <Link underline="none" variant="subtitle1" className={classes.link}>
            Manage your Google Account
          </Link>
        </div>
      </div>
      <Paper variant="outlined" square className={classes.part2}>
        <MenuList className={classes.menuList}>
          <MenuItem
            className={classes.menuItem}
            component={NavLink}
            to="/channel/dfd"
          >
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <Typography variant="inherit">Your channel</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <YouTubeIcon />
            </ListItemIcon>
            <Typography variant="inherit">Get YouTube Premium</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <Typography variant="inherit">Purchases and memberships</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={handleLogOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <Typography variant="inherit">Sign out</Typography>
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
      <Fab
        color="secondary"
        className={classes.upload}
        onClick={auth ? handleMenu : goToUpload}
      >
        <ArrowUpwardIcon />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        classes={{ list: classes.menus }}
      >
        <MenuItem onClick={goUpload}>Upload a video</MenuItem>
        <MenuItem onClick={goAdminUpload}>Add video's url</MenuItem>
      </Menu>
    </div>
  );
}
