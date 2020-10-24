import React, { useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { deepOrange } from "@material-ui/core/colors";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import ExploreIcon from "@material-ui/icons/Explore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Container } from "@material-ui/core";

import { logout } from "../../slices/authSlice";

const logoUrl =
  "url(https://pngimage.net/wp-content/uploads/2018/06/logo-sample-png-7.png)";

const useStyles = makeStyles((theme) => ({
  appbar: {
    color: "#3f51b5",
    backgroundColor: "white",
  },
  logo: {
    width: 118,
    height: 40,
    backgroundImage: logoUrl,
    backgroundRepeat: "no-repeat",
    backgroundSize: "178%",
    backgroundPosition: "center",
  },
  search: {
    width: "50%",
    margin: theme.spacing(0, "auto"),
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#3f51b5", 0.15),
    "&:hover": {
      backgroundColor: fade("#3f51b5", 0.25),
    },
    [theme.breakpoints.down("md")]: {
      width: "35%",
    },
    [theme.breakpoints.down("750")]: {
      width: "45%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    marginRight: 10,
    position: "absolute",
    right: 0,
    top: 0,
    cursor: "pointer",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 3, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  menuIcon: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("750")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  authsButtons: {
    display: "none",
    [theme.breakpoints.up("750")]: {
      display: "flex",
    },
  },
  av: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  av2: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  list: {
    padding: 0,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const active1 = location.pathname === "/" ? true : false;
  const active2 = location.pathname === "/inbox" ? true : false;
  const active3 = location.pathname === "/explore" ? true : false;
  const active4 = location.pathname === "/activity" ? true : false;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const wrapperRef = useRef(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logout(history, handleMenuClose));
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      classes={{ list: classes.list }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={NavLink}
        to={`/users/${user?.userName}`}
      >
        <AccountCircleOutlinedIcon
          color="primary"
          className={classes.menuIcon}
        />
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogOut}>
        <ExitToAppOutlinedIcon color="primary" className={classes.menuIcon} />
        Log out
      </MenuItem>
    </Menu>
  );

  const AuthButtons = (
    <div className={classes.authsButtons}>
      <Button
        component={NavLink}
        to={{ pathname: "/login", state: { from: location.pathname } }}
        color="primary"
        variant="contained"
        className={classes.button}
      >
        Login
      </Button>
      <Button
        component={NavLink}
        to={{ pathname: "/register", state: { from: location.pathname } }}
        color="primary"
        className={classes.button}
      >
        Register
      </Button>
    </div>
  );

  const sectionDesktop = (
    <div className={classes.sectionDesktop}>
      <IconButton color="inherit" component={NavLink} to="/">
        {active1 ? <HomeIcon /> : <HomeOutlinedIcon />}
      </IconButton>
      <IconButton color="inherit" component={NavLink} to="/inbox">
        {active2 ? <SendIcon /> : <SendOutlinedIcon />}
      </IconButton>
      <IconButton color="inherit" component={NavLink} to="/explore">
        {active3 ? <ExploreIcon /> : <ExploreOutlinedIcon />}
      </IconButton>
      <IconButton color="inherit" component={NavLink} to="/activity">
        {active4 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <IconButton onClick={handleMenuOpen}>
        <Avatar
          className={user?.avatar ? classes.av : classes.av2}
          alt="avatar"
          src={user?.avatar ? user.avatar : ""}
        >
          {!user?.avatar && user?.userName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
    </div>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        variant="outlined"
        className={classes.appbar}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Link to="/" component={NavLink}>
              <div className={classes.logo}></div>
            </Link>

            <div className={classes.search} ref={wrapperRef}>
              <SearchIcon className={classes.searchIcon} />
              <InputBase
                placeholder="Search…"
                autoComplete="off"
                id="search"
                name="search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            {isAuthenticated ? sectionDesktop : AuthButtons}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMenu}
    </>
  );
}
