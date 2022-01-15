import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { NavLink, useLocation } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MissedVideoCallIcon from '@material-ui/icons/MissedVideoCall';
import HeadsetIcon from '@material-ui/icons/Headset';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import TranslateOutlinedIcon from '@material-ui/icons/TranslateOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';


import Popup from "./Popup";

const useStyles = makeStyles((theme) => ({
    menu: {
        marginLeft: theme.spacing(1),
    },
    rightIcon: {
        minWidth: 0,
    }
}));

export default function GuestMenus() {
    const classes = useStyles();
    const [appsAnchorEl, setAppsAnchorEl] = useState(null);
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

    const openApps = Boolean(appsAnchorEl);
    const openSettings = Boolean(settingsAnchorEl);

    const location = useLocation();

    const handleToggleApps = (event) => {
        setAppsAnchorEl(appsAnchorEl ? null : event.currentTarget);
    };

    const handleCloseApps = (event) => {
        if (appsAnchorEl && appsAnchorEl.contains(event.target)) {
            return;
        }
        setAppsAnchorEl(null);
    };

    const handleToggleSettings = (event) => {
        setSettingsAnchorEl(settingsAnchorEl ? null : event.currentTarget);
    };

    const handleCloseSettings = (event) => {
        if (settingsAnchorEl && settingsAnchorEl.contains(event.target)) {
            return;
        }
        setSettingsAnchorEl(null);
    };

    const menus = [
        {
            title: "Youtube apps",
            icon: <AppsOutlinedIcon />,
            onClick: handleToggleApps
        },
        {
            title: "Settings",
            icon: <MoreVertIcon />,
            onClick: handleToggleSettings
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

    const settingsMenus = [
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
            title: "Settings",
            icon: <SettingsOutlinedIcon />,
        },
        {
            title: "Your data in YouTube         ",
            icon: <VerifiedUserOutlinedIcon />,
        },
        {
            title: "Help",
            icon: <HelpOutlineOutlinedIcon />,
        },
    ]

    return (
        <>
            {menus.map(({ icon, title, onClick }, index) =>
                <Tooltip key={index} title={title} >
                    <IconButton onClick={onClick} color="inherit" className={classes.menu}>
                        {icon}
                    </IconButton>
                </Tooltip>
            )}
            <Button
                component={NavLink}
                to={{ pathname: "/login", state: { from: location.pathname } }}
                variant="outlined"
                color="primary"
                className={classes.menu}
                startIcon={<AccountCircleOutlinedIcon />}
            >
                Sign in
            </Button>

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

            <Popup open={openSettings}
                anchorEl={settingsAnchorEl}
                handleClose={handleCloseSettings}
            >
                <List>
                    {settingsMenus.map(({ icon, title, rightIcon }, index) =>
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
