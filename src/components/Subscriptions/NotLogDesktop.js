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

    const SubscriptionIcon = () => (
        <SvgIcon className={classes.icon}>
            <path
                d="M 4 6 h 16 v 2 H 4 Z m 2 -4 h 12 v 2 H 6 Z m 14 8 H 4 c -1.1 0 -2 0.9 -2 2 v 8 c 0 1.1 0.9 2 2 2 h 16 c 1.1 0 2 -0.9 2 -2 v -8 c 0 -1.1 -0.9 -2 -2 -2 Z m 0 10 H 4 v -8 h 16 v 8 Z m -10 -7.27 v 6.53 L 16 16 Z"
                stroke="white"
                strokeWidth={1}
            />
        </SvgIcon>
    );

    return (
        <div className={classes.root}>
            <SubscriptionIcon />
            <Typography variant="h5">
                Don’t miss new videos
            </Typography>
            <Typography variant="body2" className={classes.subtext}>
                Sign in to see updates from your favorite YouTube channels
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