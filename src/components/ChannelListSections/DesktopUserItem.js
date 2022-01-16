import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Button, Grid, IconButton, Link, Typography } from '@material-ui/core';
import { NotificationsNoneOutlined } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink, useLocation } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useDispatch, useSelector } from "react-redux";
import Divider from '@material-ui/core/Divider';

import Popup from '../HomeSections/Desktop/Popup';

import { toggleSubscribe } from "../../slices/videoSlice";
import { addSubscribedUsers } from "../../slices/authSlice";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        fontSize: '3rem',
        backgroundColor: '#00579c',
    },
    info: {
        flexGrow: 1,
        textDecoration: 'none',
        color: 'inherit',
    },
    btnGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: theme.spacing(1),
    },
    btn: {
        marginRight: theme.spacing(1)
    },
    rightPart: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    sub: {
        margin: theme.spacing(1, 0, 0.6, 0),
    },
    user: {
        display: 'inline-block',
    },
    action: {
        padding: theme.spacing(1.5, 0.5),
        justifyContent: 'space-around',
    },
    title: {
        fontWeight: 400,
        fontSize: "1.1rem",
        padding: theme.spacing(2, 3, 0, 3),
    },
    contentText: {
        margin: 0,
    },
}));

export default function DesktopUserItem({ user }) {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const { _id, avatar, displayName, subscribersCount, videosCount, description } = user.userTo;
    const letterAvatar = displayName.charAt(0).toUpperCase();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const location = useLocation();

    const auth = useSelector((state) => state.auth);
    const isMe = auth?.user?._id === _id
    const isSubscribed = auth?.user?.subscribedUsers?.some((user) => user.userTo._id === _id)
    const isAuthenticated = auth.isAuthenticated;

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSubscribe = (event) => {
        if (isAuthenticated) {
            dispatch(toggleSubscribe(_id));
            dispatch(addSubscribedUsers(user))
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleUnsubscribe = () => {
        dispatch(toggleSubscribe(_id));
        setOpenModal(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={4} align="center">
                    <Link component={NavLink} to={`/channel/${_id}`}>
                        <Avatar alt="avatar" src={avatar} className={classes.large}>
                            {letterAvatar}
                        </Avatar>
                    </Link>
                </Grid>
                <Grid item xs={8} >
                    <div className={classes.rightPart}>
                        <Typography underline='none' component={NavLink} to={`/channel/${_id}`} className={classes.info}>
                            <div className={classes.user}>
                                <Tooltip title={displayName} placement="top-start">
                                    <Typography variant='h6'>{displayName}</Typography>
                                </Tooltip>
                            </div>
                            <Typography variant="body2" className={classes.sub}>
                                {subscribersCount} subscribers &#8226; {videosCount || 0} videos
                            </Typography>
                            {description && <Typography variant="body2">{description}</Typography>}
                        </Typography>

                        {!isMe && <div className={classes.btnGroup}>
                            {isSubscribed ?
                                <>
                                    <Button
                                        variant="contained"
                                        className={classes.btn}
                                        onClick={handleOpenModal}
                                    >Subscribed
                                    </Button>
                                    <IconButton>
                                        <NotificationsNoneOutlined />
                                    </IconButton>
                                </>
                                :
                                <Button onClick={handleSubscribe} variant="contained" color="secondary">
                                    Subscribe
                                </Button>
                            }
                        </div>
                        }
                    </div>
                </Grid>
            </Grid>

            {openModal && (
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogContent >
                        <DialogContentText variant="subtitle1">
                            Unsubscribe from {displayName}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions classes={{ root: classes.action }}>
                        <Button onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button onClick={handleUnsubscribe} color="secondary">
                            Unsubscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            <Popup open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                handleClose={handleClose}
            >
                <Typography className={classes.title}>
                    Want to subscribe to this channel?
                </Typography>
                <DialogContent>
                    <DialogContentText className={classes.contentText} variant="body2">
                        Sign in to subscribe to this channel.
                    </DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions >
                    <Button
                        component={NavLink}
                        to={{ pathname: "/login", state: { from: location.pathname } }}
                        color="primary"
                    >
                        Sign in
                    </Button>
                </DialogActions>
            </Popup>

        </>
    )
}
