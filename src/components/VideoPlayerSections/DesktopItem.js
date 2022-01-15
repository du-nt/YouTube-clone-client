import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { IconButton, Link, Typography, useMediaQuery } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistPlayOutlinedIcon from '@material-ui/icons/PlaylistPlayOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import Divider from "@material-ui/core/Divider";
import Tooltip from '@material-ui/core/Tooltip';
import BlockIcon from '@material-ui/icons/Block';

import moment from "moment";

import { useHover } from "../../hooks";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1.5),
        display: "flex",
        alignItems: "flex-start",
        position: "relative",
    },
    info: {
        height: "100%",
        paddingRight: theme.spacing(6),
        cursor: "pointer",
    },
    gray: {
        color: "#545454",
        wordBreak: "break-word",
        lineHeight: "normal",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "1",
        overflow: "hidden",
        fontSize: "0.9rem",
    },
    title: {
        color: 'inherit',
        fontWeight: 500,
        textDecoration: 'none',
        wordBreak: "break-word",
        lineHeight: "normal",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "2",
        overflow: "hidden",
        fontSize: "0.95rem",
    },
    duration: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "hsla(0,0%,6.7%, .8 )",
        color: "#eee",
        padding: "1px 4px",
        fontSize: 13,
        borderRadius: 2,
    },
    media: {
        height: 0,
        paddingTop: "58%",
        position: "relative",
    },
    menuList: {
        padding: 0,
        width: 255,
    },
    moreBtn: {
        position: "absolute",
        right: 0,
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(0.7)
    },
    channel: {
        marginTop: theme.spacing(0.7)
    }
}));

export default function Video({ video }) {
    const classes = useStyles();
    const { _id, title, duration, thumbnail, views, createdAt, author } = video;
    const time = moment(createdAt).fromNow();
    const history = useHistory();

    const videoRef = useRef(null);
    const isHover = useHover(videoRef);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)

    const matches = useMediaQuery('(min-width:960px)');

    const handleOpen = (e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLinkClick = (e) => {
        e.stopPropagation();
    }

    useEffect(() => {
        !matches && setAnchorEl(null);
    }, [matches])


    return (
        <div className={classes.root} ref={videoRef}>
            <Grid container spacing={1} >
                <Grid item xs={5}>
                    <CardMedia
                        component={NavLink}
                        to={`/watch/${_id}`}
                        className={classes.media}
                        image={thumbnail}
                        title="poster"
                    >
                        <Typography className={classes.duration}>{duration}</Typography>
                    </CardMedia>
                </Grid>
                <Grid item xs={7}>
                    <div className={classes.info} onClick={() => history.push(`/watch/${_id}`)}>
                        <Typography
                            onClick={handleLinkClick}
                            component={NavLink} to={`/watch/${_id}`}
                            className={classes.title}
                            variant={'body1'}
                        >
                            {title}
                        </Typography>
                        <div className={classes.channel}>
                            <Link underline='none' onClick={handleLinkClick} component={NavLink} to={`/channel/${author._id}`}>
                                <Tooltip title={author.displayName} placement="top-start">
                                    <Typography className={classes.gray} variant="body2" >
                                        {author.displayName}
                                    </Typography>
                                </Tooltip>
                            </Link>
                            <Typography variant="body2" className={classes.gray}>
                                {views} views &#8226; {time}
                            </Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>

            {(isHover || open) && <IconButton onClick={handleOpen} className={classes.moreBtn}>
                <MoreVertIcon />
            </IconButton>
            }

            {
                open && <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                    getContentAnchorEl={null}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon className={classes.menuIcon}>
                            <PlaylistPlayOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add to queue" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon className={classes.menuIcon}>
                            <ScheduleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Save to Watch later" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon className={classes.menuIcon}>

                            <PlaylistAddOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Save to playlist" />
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon className={classes.menuIcon}>
                            <BlockIcon />
                        </ListItemIcon>
                        <ListItemText primary="Not interested" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon className={classes.menuIcon}>
                            <FlagOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Report" />
                    </MenuItem>
                </Menu>
            }

        </div>
    );
}
