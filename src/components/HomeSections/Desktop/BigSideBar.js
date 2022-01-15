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
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import { Typography } from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import Button from '@material-ui/core/Button';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    paddingLeft: theme.spacing(1),
  },
  title: {
    fontSize: '0.6rem',
  },
  subHeader: {
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: "0.9rem",
    padding: theme.spacing(1, 3),
  },
  avatarSmall: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  avatarSmall2: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: '#404040'
  },
  signinPart: {
    padding: theme.spacing(2, 2, 2, 4),
  },
  signinText: {
    whiteSpace: 'initial',
    marginBottom: theme.spacing(1.5),
    fontSize: '0.95rem',
  },
  bestIcon: {
    width: '0.95rem',
    height: '0.95rem'
  },
  selected: {
    backgroundColor: '#cacaca !important',
  },
  active: {
    color: '#262626'
  }
}))

export default function BigSideBar() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const subscribedUsers = user?.subscribedUsers

  const location = useLocation();

  const list1 = [
    {
      title: "Home",
      icon: path === '/' ? <HomeIcon className={classes.active} /> : <HomeOutlinedIcon />,
      to: "/",
      isSelected: path === '/'
    },
    {
      title: "Explore",
      icon: path === '/feed/trending' ? <ExploreIcon className={classes.active} /> : <ExploreOutlinedIcon />,
      to: "/feed/trending",
      isSelected: path === '/feed/trending'
    },
    {
      title: "Subscriptions",
      icon: path === '/feed/subscriptions' ? <SubscriptionsIcon className={classes.active} /> : <SubscriptionsOutlinedIcon />,
      to: "/feed/subscriptions",
      isSelected: path === '/feed/subscriptions'
    },
  ]

  const list2 = [
    {
      title: "Library",
      icon: path === '/feed/library' ? <VideoLibraryIcon className={classes.active} /> : <VideoLibraryOutlinedIcon />,
      to: "/feed/library",
      isSelected: path === '/feed/library'
    },
    {
      title: "History",
      icon: <HistoryOutlinedIcon />,
    },
    {
      title: "Your videos",
      icon: <PlayCircleOutlineOutlinedIcon />,
      to: `/channel/${user?._id}/videos`
    },
    {
      title: "Watch later",
      icon: <QueryBuilderOutlinedIcon />,
    },
    {
      title: "Liked videos",
      icon: <ThumbUpAltOutlinedIcon />,
    },
    {
      title: "Show more",
      icon: <KeyboardArrowDownOutlinedIcon />,
    },
  ]

  const sublist = isAuthenticated ? list2 : list2.slice(0, 2);

  const bestMenus = [
    {
      title: "Music",
      icon: <QueueMusicIcon className={classes.bestIcon} />,
    },
    {
      title: "Sports",
      icon: <EmojiEventsIcon className={classes.bestIcon} />,
    },
    {
      title: "Gaming",
      icon: <SportsEsportsIcon className={classes.bestIcon} />,
    },
  ]

  return (
    <>
      <List>
        {list1.map(({ icon, title, to, isSelected }, index) => (
          <ListItem classes={{ selected: classes.selected }} selected={isSelected} button key={index} component={NavLink} to={to}>
            <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {sublist.map(({ icon, title, to, isSelected }, index) => (
          <ListItem selected={isSelected} button key={index} component={to ? NavLink : null} to={to || null}>
            <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
      <Divider />

      {!isAuthenticated && (
        <>
          <div className={classes.signinPart}>
            <Typography className={classes.signinText} >Sign in to like videos, comment, and subscribe.</Typography>
            <Button
              component={NavLink}
              to={{ pathname: "/login", state: { from: location.pathname } }}
              variant="outlined"
              color="primary"
              startIcon={<AccountCircleOutlinedIcon />}
            >
              Sign in
            </Button>

          </div>
          <Divider />
        </>
      )
      }

      {isAuthenticated && subscribedUsers.length ?
        <>
          <Typography className={classes.subHeader} variant="body1">Subscriptions</Typography>
          {subscribedUsers.map((user, index) => (
            <ListItem button key={index} component={NavLink} to={`/channel/${user?.userTo?._id}`}>
              <ListItemAvatar className={classes.icon}>
                <Avatar
                  className={classes.avatarSmall}
                  src={user?.userTo?.avatar}
                  alt="avatar"
                >
                  {user?.userTo?.displayName.charAt(0).toUpperCase() ||
                    user?.userTo?.email.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user?.userTo?.displayName} />
            </ListItem>
          ))}
        </>
        :
        <>
          <Typography className={classes.subHeader} variant="body1">Best of Youtube</Typography>
          {bestMenus.map(({ title, icon }, index) => (
            <ListItem button key={index}>
              <ListItemAvatar className={classes.icon}>
                <Avatar
                  className={classes.avatarSmall2}
                >
                  {icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </>
      }
    </>
  )
}
