import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ExploreIcon from '@material-ui/icons/Explore';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    list: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1.5, 0)
    },
    icon: {
        justifyContent: 'center',
    },
    title: {
        fontSize: '0.6rem',
    },
    active: {
        color: '#262626'
    }
}))

export default function SmallSideBar() {
    const classes = useStyles();
    const { path } = useRouteMatch();

    const list = [
        {
            title: "Home",
            icon: path === '/' ? <HomeIcon className={classes.active} /> : <HomeOutlinedIcon />,
            to: "/",
        },
        {
            title: "Explore",
            icon: path === '/feed/trending' ? <ExploreIcon className={classes.active} /> : <ExploreOutlinedIcon />,
            to: "/feed/trending",
        },
        {
            title: "Subscriptions",
            icon: path === "/feed/subscriptions" ? <SubscriptionsIcon className={classes.active} /> : <SubscriptionsOutlinedIcon />,
            to: "/feed/subscriptions",
        },
        {
            title: "Library",
            icon: path === "/feed/library" ? <VideoLibraryIcon className={classes.active} /> : <VideoLibraryOutlinedIcon />,
            to: "/feed/library",
        }
    ]

    return (
        <List>
            {list.map(({ icon, title, to }, index) => (
                <div key={index}>
                    <ListItem className={classes.list} button component={NavLink} to={to} >
                        <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
                        <Typography className={classes.title} variant="caption">{title}</Typography>
                    </ListItem>
                </div>
            ))}
        </List>
    )
}
