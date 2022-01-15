import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import SvgIcon from '@material-ui/core/SvgIcon';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { NavLink, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: '150px'
    },
    icon: {
        fontSize: "7rem",
        color: '#3a3a3a',
        marginBottom: theme.spacing(4),
    },
    subtext: {
        margin: theme.spacing(2, 0)
    }
}));

export default function NotLogDesktop() {
    const classes = useStyles();
    const location = useLocation();

    const LibraryIcon = () => (
        <SvgIcon className={classes.icon}>
            <path
                d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM12 5.5v9l6-4.5z"
                stroke="white"
                strokeWidth={1}
            />
        </SvgIcon>
    );

    return (
        <div className={classes.root}>
            <LibraryIcon />
            <Typography variant="h5">
                Enjoy your favorite videos
            </Typography>
            <Typography variant="body2" className={classes.subtext}>
                Sign in to access videos that you’ve liked or saved
            </Typography>
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
        </div>
    );
}
