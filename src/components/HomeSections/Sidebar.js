import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Logo from "./Logo";

const drawerWidth = 240;
const list = [
    {
        title: "Karlan",
        icon: <InboxIcon />,
    },
    {
        title: "Aubrette",
        icon: <MailIcon />,
    },
    {
        title: "Katusha",
        icon: <HomeIcon />,
    },
    {
        title: "Karlan",
        icon: <InboxIcon />,
    },
    {
        title: "Aubrette",
        icon: <MailIcon />,
    },
    {
        title: "Katusha",
        icon: <HomeIcon />,
    },
    {
        title: "Karlan",
        icon: <InboxIcon />,
    },
    {
        title: "Aubrette",
        icon: <MailIcon />,
    },
    {
        title: "Katusha",
        icon: <HomeIcon />,
    },
    {
        title: "Karlan",
        icon: <InboxIcon />,
    },
    {
        title: "Aubrette",
        icon: <MailIcon />,
    },
    {
        title: "Katusha",
        icon: <HomeIcon />,
    },
    {
        title: "Karlan",
        icon: <InboxIcon />,
    },
    {
        title: "Aubrette",
        icon: <MailIcon />,
    },
    {
        title: "Katusha",
        icon: <HomeIcon />,
    },
    {
        title: "Karlan",
        icon: <InboxIcon />,
    },
    {
        title: "Aubrette",
        icon: <MailIcon />,
    },
    {
        title: "Katusha",
        icon: <HomeIcon />,
    },
    {
        title: "Karlan",
        icon: <InboxIcon />,
    },
    {
        title: "Aubrette",
        icon: <MailIcon />,
    },
    {
        title: "Katusha",
        icon: <HomeIcon />,
    },
    {
        title: "Karlan",
        icon: <InboxIcon />,
    },
    {
        title: "Aubrette",
        icon: <MailIcon />,
    },
    {
        title: "Katusha",
        icon: <HomeIcon />,
    },
    {
        title: "Karlan",
        icon: <InboxIcon />,
    },
    {
        title: "Aubrette",
        icon: <MailIcon />,
    },
    {
        title: "Katusha",
        icon: <HomeIcon />,
    },
];

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "white",
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 0.5),
        borderBottom: "1px solid",
        borderBottomColor: 'white',
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-start",
        [theme.breakpoints.up("lg")]: {
            flexDirection: "row-reverse",
        },
    },
    stickyDrawerHeader: {
        position: "sticky",
        top: 0,
        backgroundColor: 'white',
        borderBottom: "1px solid",
        borderBottomColor: 'white',
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 0.5),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-start",
        [theme.breakpoints.up("lg")]: {
            flexDirection: "row-reverse",
        },
    },
    menuButton: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("lg")]: {
            marginRight: 0,
            marginLeft: theme.spacing(3.5),
        },
    },
}));

export default function Sidebar({ open, handleDrawerClose }) {
    const classes = useStyles();
    const matches = useMediaQuery("(min-width:1280px)");
    const stickyDrawerHeader = true;

    return (
        <div>
            <Drawer
                anchor="left"
                open={open}
                onClose={handleDrawerClose}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div
                    className={
                        stickyDrawerHeader
                            ? classes.stickyDrawerHeader
                            : classes.drawerHeader
                    }
                >
                    <IconButton
                        className={classes.menuButton}
                        onClick={handleDrawerClose}
                    >
                        {matches ? <ArrowBackIcon /> : <MenuIcon />}
                    </IconButton>

                    <div onClick={handleDrawerClose}>
                        <Logo />
                    </div>
                </div>

                <List>
                    {list.map(({ title, icon }, index) => (
                        <ListItem button key={index}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}