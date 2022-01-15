import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import BigSideBar from "./BigSideBar";

const logoUrl =
    "url(https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg)";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: 'white',
    },
    stickyDrawerHeader: {
        padding: theme.spacing(0, 3),
        position: "sticky",
        top: 0,
        backgroundColor: 'white',
        zIndex: 10,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        ...theme.mixins.toolbar,
    },
    menuButton: {
        marginRight: 16,
    },
    logo: {
        width: 92,
        height: 25,
        backgroundImage: logoUrl,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        backgroundPosition: "center",
    },
}));

export default function ({ open, handleDrawerClose }) {
    const classes = useStyles();

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={handleDrawerClose}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.stickyDrawerHeader}>
                <IconButton
                    onClick={handleDrawerClose}
                    className={classes.menuButton}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <Link to="/" component={NavLink}>
                    <div className={classes.logo}></div>
                </Link>
            </div>

            <BigSideBar />
        </Drawer>
    );
}