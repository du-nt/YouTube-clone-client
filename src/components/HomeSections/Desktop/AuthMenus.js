import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewComfyOutlinedIcon from '@material-ui/icons/ViewComfyOutlined';
import Avatar from "@material-ui/core/Avatar";
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from "@material-ui/core";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MissedVideoCallIcon from '@material-ui/icons/MissedVideoCall';
import HeadsetIcon from '@material-ui/icons/Headset';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import { Divider } from '@material-ui/core';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import TranslateOutlinedIcon from '@material-ui/icons/TranslateOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useDispatch } from "react-redux";

import { logout } from "../../../slices/authSlice";

import Popup from "./Popup";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    menu: {
        marginLeft: theme.spacing(1),
    },
    avatarDesktop: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        color: theme.palette.primary.main,
        backgroundColor: "#fff",
    },
    notificationsHeader: {
        flexDirection: 'row-reverse',
        paddingBottom: theme.spacing(0.5),
        paddingTop: theme.spacing(0.5),
    },
    notifications: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    setttingsIcon: {
        minWidth: 0
    },
    notificationsIcon: {
        fontSize: "7rem",
        color: '#909090',
        margin: theme.spacing(15, 0, 3, 0),
    },
    secondText: {
        margin: theme.spacing(1, 12, 15, 12),
        textAlign: 'center'
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
    displayName: {
        fontWeight: "500",
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        backgroundColor: "#00579c",
        marginTop: 5,
        fontSize: 26,
        textDecoration: "none",
    },
    link: {
        marginTop: 6,
    },
    rightIcon: {
        minWidth: 0,
    }
}));

export default function AuthMenus({ user }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const avatarLetter =
        user?.displayName.charAt(0).toUpperCase() ||
        user?.email.charAt(0).toUpperCase();

    const [createAnchorEl, setCreateAnchorEl] = useState(null);
    const [appsAnchorEl, setAppsAnchorEl] = useState(null);
    const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
    const [accountAnchorEl, setAccountAnchorEl] = useState(null);

    const openCreate = Boolean(createAnchorEl);
    const openApps = Boolean(appsAnchorEl);
    const openNotifications = Boolean(notificationsAnchorEl);
    const openAccount = Boolean(accountAnchorEl);

    const history = useHistory();

    const handleClick = () => {
        setAccountAnchorEl(null)
        history.push(`/channel/${user._id}`)
    }

    const handleLogOut = () => {
        dispatch(logout());
        setAccountAnchorEl(null);
    };


    const handleToggleCreate = (event) => {
        setCreateAnchorEl(createAnchorEl ? null : event.currentTarget);
    };

    const handleCloseCreate = (event) => {
        if (createAnchorEl && createAnchorEl.contains(event.target)) {
            return;
        }
        setCreateAnchorEl(null);
    };

    const handleToggleApps = (event) => {
        setAppsAnchorEl(appsAnchorEl ? null : event.currentTarget);
    };

    const handleCloseApps = (event) => {
        if (appsAnchorEl && appsAnchorEl.contains(event.target)) {
            return;
        }
        setAppsAnchorEl(null);
    };

    const handleToggleNotifications = (event) => {
        setNotificationsAnchorEl(notificationsAnchorEl ? null : event.currentTarget);
    };

    const handleCloseNotifications = (event) => {
        if (notificationsAnchorEl && notificationsAnchorEl.contains(event.target)) {
            return;
        }
        setNotificationsAnchorEl(null);
    };

    const handleToggleAccount = (event) => {
        setAccountAnchorEl(accountAnchorEl ? null : event.currentTarget);
    };

    const handleCloseAccount = (event) => {
        if (accountAnchorEl && accountAnchorEl.contains(event.target)) {
            return;
        }
        setAccountAnchorEl(null);
    };

    const menus = [
        {
            title: "Create",
            icon: openCreate ? <VideoCallIcon /> : <VideoCallOutlinedIcon />,
            onClick: handleToggleCreate
        },
        {
            title: "Youtube apps",
            icon: openApps ? <ViewComfyIcon /> : <ViewComfyOutlinedIcon />,
            onClick: handleToggleApps
        },
        {
            title: "Notifications",
            icon: openNotifications ? <NotificationsIcon /> : <NotificationsOutlinedIcon />,
            onClick: handleToggleNotifications
        },
        {
            title: '',
            icon:
                <Avatar
                    className={classes.avatarDesktop}
                    src={user?.avatar}
                    alt="avatar"
                >
                    {avatarLetter}
                </Avatar>
            ,
            onClick: handleToggleAccount
        },
    ];

    const appsMenus = [
        {
            title: "Youtube TV",
            icon: <MissedVideoCallIcon color="secondary" />,
        },
        {
            title: "Youtube Music",
            icon: <HeadsetIcon color="secondary" />,
        },
        {
            title: "Youtube Kids",
            icon: <YouTubeIcon color="secondary" />,
        },
        {
            title: "Youtube for Artists",
            icon: <MovieFilterIcon color="secondary" />,
        },
    ]

    const accountMenus1 = [
        {
            title: "Your channel",
            icon: <AccountBoxOutlinedIcon />,
            onClick: handleClick
        },
        {
            title: "Purchases and membership",
            icon: <MonetizationOnOutlinedIcon />,
        },
        {
            title: "Youtube Studio",
            icon: <SettingsOutlinedIcon />,
        },
        {
            title: "Switch account",
            icon: <PeopleAltOutlinedIcon />,
            rightIcon: <KeyboardArrowRightOutlinedIcon />,
        },
        {
            title: "Sign out",
            icon: <ExitToAppOutlinedIcon />,
            onClick: handleLogOut
        },
    ]

    const accountMenus2 = [
        {
            title: "Appearance",
            icon: <Brightness2OutlinedIcon />,
            rightIcon: <KeyboardArrowRightOutlinedIcon />,
        },
        {
            title: "Language",
            icon: <TranslateOutlinedIcon />,
            rightIcon: <KeyboardArrowRightOutlinedIcon />,
        },
        {
            title: "Location",
            icon: <LanguageOutlinedIcon />,
            rightIcon: <KeyboardArrowRightOutlinedIcon />,
        },
        {
            title: "Your data in YouTube",
            icon: <VerifiedUserOutlinedIcon />,
        },
        {
            title: "Help",
            icon: <HelpOutlineOutlinedIcon />,
        },
    ]


    const NotificationsNoneIcon = () => (
        <SvgIcon className={classes.notificationsIcon}>
            <path
                d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
                stroke="white"
                strokeWidth={0.8}
            />
        </SvgIcon>
    );

    return (
        <>
            {menus.map(({ icon, title, onClick }, index) =>
                <Tooltip key={index} title={title} >
                    <IconButton onClick={onClick} color="inherit" className={classes.menu}>
                        {icon}
                    </IconButton>
                </Tooltip>
            )}

            <Popup open={openCreate}
                anchorEl={createAnchorEl}
                handleClose={handleCloseCreate}
            >
                <List>
                    <ListItem button component={NavLink} to='/upload' >
                        <ListItemIcon ><PlayCircleOutlineIcon /></ListItemIcon>
                        <ListItemText primary='Upload video' />
                    </ListItem>
                    <ListItem button   >
                        <ListItemIcon ><GraphicEqIcon /></ListItemIcon>
                        <ListItemText primary='Go live' />
                    </ListItem>
                </List>
            </Popup>

            <Popup open={openApps}
                anchorEl={appsAnchorEl}
                handleClose={handleCloseApps}
            >
                <List>
                    {appsMenus.map(({ icon, title }, index) =>
                        <ListItem button key={index}>
                            <ListItemIcon >{icon}</ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    )}
                </List>
            </Popup>

            <Popup open={openNotifications}
                anchorEl={notificationsAnchorEl}
                handleClose={handleCloseNotifications}
            >
                <ListItem className={classes.notificationsHeader}>
                    <ListItemIcon className={classes.setttingsIcon} >
                        <IconButton >
                            <SettingsOutlinedIcon />
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary='Notifications' />
                </ListItem>
                <Divider />
                <div className={classes.notifications}>
                    <NotificationsNoneIcon />
                    <Typography variant="h6" color="textSecondary">Your notifications live here</Typography>
                    <Typography className={classes.secondText} variant="body1" color="textSecondary">Subscribe to your favourite channels to receive notifications about their latest videos.</Typography>
                </div>
            </Popup>

            <Popup open={openAccount}
                anchorEl={accountAnchorEl}
                handleClose={handleCloseAccount}
            >
                <div className={classes.personal}>
                    <Avatar
                        alt="avatar"
                        src={user.avatar}
                        className={classes.large}
                    >
                        {avatarLetter}
                    </Avatar>
                    <div className={classes.info}>
                        <Typography className={classes.displayName}>
                            {user.displayName}
                        </Typography>
                        <Link component={NavLink} to={`/profile/${user._id}`} underline="none" variant="subtitle1" className={classes.link}>
                            Manage your Google Account
                        </Link>
                    </div>
                </div>
                <Divider />

                <List>
                    {accountMenus1.map(({ icon, title, rightIcon, onClick }, index) =>
                        <ListItem button key={index} onClick={onClick || null}>
                            <ListItemIcon >{icon}</ListItemIcon>
                            <ListItemText primary={title} />
                            {rightIcon && <ListItemIcon className={classes.rightIcon}>{rightIcon}</ListItemIcon>}
                        </ListItem>
                    )}
                </List>
                <Divider />

                <List>
                    {accountMenus2.map(({ icon, title, rightIcon }, index) =>
                        <ListItem button key={index}>
                            <ListItemIcon >{icon}</ListItemIcon>
                            <ListItemText primary={title} />
                            {rightIcon && <ListItemIcon className={classes.rightIcon}>{rightIcon}</ListItemIcon>}
                        </ListItem>
                    )}
                </List>
            </Popup>
        </>
    )
}
