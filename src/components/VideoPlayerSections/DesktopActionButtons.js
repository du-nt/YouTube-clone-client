import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { Divider, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import { NotificationsNoneOutlined } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import moment from "moment";
import { NavLink } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useLocation } from 'react-router-dom';

import Popup from './Popup';
import ShareButton from "./ShareButton";

import { like, dislike } from "../../slices/videoSlice";
import { toggleSubscribe } from "../../slices/videoSlice";
import { addSubscribedUsers } from "../../slices/authSlice";

const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const useStyles = makeStyles((theme) => ({
  root: {

  },
  btnGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    cursor: "pointer",
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5, 1)
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentInput: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    marginLeft: theme.spacing(1.5)
  },
  commentCount: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(1.5),
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1),
    height: 54
  },
  divider: {
    height: 24,
    alignSelf: "center"
  },
  largeDivider: {
    height: 40,
    alignSelf: "center"
  },
  share: {
    transform: 'rotateY(180deg)',
  },
  showMoreBtn: {
    marginBottom: 2,
    padding: theme.spacing(0.3, 0.5),
    textTransform: "Capitalize",
    lineHeight: 1,
    position: "absolute",
    bottom: 0,
    left: 125,
  },
  description: {
    position: "relative",
  },
  showLess: {
    marginBottom: 2,
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(0.3, 0.5),
    textTransform: "Capitalize",
    lineHeight: 1,
  },
  container: {
    marginTop: theme.spacing(1.5)
  },
  title: {
    marginTop: theme.spacing(2),
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
    overflow: "hidden",
    wordBreak: "break-word",
    lineHeight: "normal",
  },
  displayName: {
    marginLeft: theme.spacing(1.5),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 16,
    backgroundColor: '#ef6c00',
    marginRight: theme.spacing(1),
  },
  large: {
    backgroundColor: '#ef6c00',
    textDecoration: 'none'
  },
  firstComment: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
    wordBreak: "break-word",
    lineHeight: "normal",
  },
  btn: {
    marginRight: theme.spacing(0.5),
  },
  smallInput: {
    flex: 1,
    backgroundColor: "#c3c3c3",
    borderRadius: 4,
    padding: "4px 16px",
    color: "#3e3d3d",
  },
  userName: {
    fontWeight: 500,
    textDecoration: "none",
  },
  iconBtn1: {
    padding: 10,
  },
  title1: {
    fontWeight: 400,
    fontSize: "1.1rem",
    padding: theme.spacing(2, 3, 0, 3),
  },
  contentText: {
    margin: 0,
  },
}))

export default function DesktopActionButtons() {
  const classes = useStyles();
  const [isShowMore, setIsShowMore] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likeAnchorEl, setLikeAnchorEl] = useState(null);
  const [dislikeAnchorEl, setDislikeAnchorEl] = useState(null);
  const [saveAnchorEl, setSaveAnchorEl] = useState(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const {
    _id,
    title,
    views,
    createdAt,
    description,
    likesCount,
    dislikesCount,
    isLiked,
    isDisliked,
    author,
    subscribersCount,
    videosCount,
    isMe,
    isSubscribed,
    commentsCount,
    firstComment,
  } = useSelector((state) => state.video);
  const time = moment(createdAt).format("ll");
  const letterAvatar = author.displayName.charAt(0).toUpperCase();
  const authLetterAvatar = user && user?.displayName.charAt(0).toUpperCase();
  const letterAvatar2 =
    firstComment && firstComment?.author?.displayName.charAt(0).toUpperCase();

  const handleShowMore = () => setIsShowMore(!isShowMore);

  const handleLike = () => {
    dispatch(like(_id));
  };

  const handleDislike = () => {
    dispatch(dislike(_id));
  };

  const handleSubscribe = () => {
    const newSubscribedUser = {
      userTo: {
        _id: author._id,
        displayName: author.displayName,
        avatar: author.avatar,
        subscribersCount,
        videosCount,
      }
    }
    dispatch(toggleSubscribe(author._id));
    dispatch(addSubscribedUsers(newSubscribedUser))
  };

  const handleUnsubscribe = () => {
    dispatch(toggleSubscribe(author._id));
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLike = (event) => {
    setLikeAnchorEl(event.currentTarget)
  }

  const handleCloseLike = () => {
    setLikeAnchorEl(null);
  };

  const handleOpenDislike = (event) => {
    setDislikeAnchorEl(event.currentTarget)
  }

  const handleCloseDislike = () => {
    setDislikeAnchorEl(null);
  };

  const handleOpenSave = (event) => {
    setSaveAnchorEl(event.currentTarget)
  }

  const handleCloseSave = () => {
    setSaveAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6" >{title}</Typography>
      <Grid container alignItems="flex-end">
        <Grid item xs={6}>
          <div className={classes.description}>
            <Typography variant="body2">{views} views &#8226; Published on {time}</Typography>
            {description && (
              <Typography variant="body2">{description}</Typography>
            )}
            <Typography variant="body2" > {isShowMore ? text : text.substring(0, 15)}</Typography>
            <Button className={isShowMore ? classes.showLess : classes.showMoreBtn} onClick={handleShowMore}>{isShowMore ? "show less" : 'Show more'}</Button>
          </div>
        </Grid>
        <Grid item xs={6} >
          <div className={classes.btnGroup}
          >
            <Tooltip title="I like this">
              <div
                onClick={!isAuthenticated ? handleOpenLike : handleLike}
                className={classes.iconBtn}
              >
                <IconButton >
                  {isLiked ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
                </IconButton>
                <Typography>{likesCount}</Typography>
              </div>
            </Tooltip>
            <Tooltip title="I dislike this">
              <div
                onClick={!isAuthenticated ? handleOpenDislike : handleDislike}
                className={classes.iconBtn}
              >
                <IconButton >
                  {isDisliked ? <ThumbDownAltIcon /> : <ThumbDownOutlinedIcon />}
                </IconButton>
                <Typography>{dislikesCount}</Typography>
              </div>
            </Tooltip>
            <ShareButton
              config={{
                params: {
                  title: title,
                  text: title,
                  url: window.location.href,
                },
              }}
            />
            <Tooltip title="Save">
              <div
                onClick={!isAuthenticated ? handleOpenSave : null}
                className={classes.iconBtn}
              >
                <IconButton >
                  <PlaylistAddOutlinedIcon />
                </IconButton>
                <Typography>Save</Typography>
              </div>
            </Tooltip>
            <IconButton >
              <MoreHorizIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <div className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Paper variant="outlined" className={classes.user}>
              <div className={classes.left}>
                <Avatar
                  className={classes.large}
                  alt="avatar"
                  src={author.avatar}
                  component={NavLink}
                  to={`/channel/${author._id}`}
                >
                  {letterAvatar}
                </Avatar>
                <div className={classes.displayName}>
                  <Tooltip title={author.displayName} placement='top'>
                    <Typography
                      className={classes.userName}
                      color="inherit"
                      component={NavLink}
                      to={`/channel/${author._id}`}
                    >{author.displayName}</Typography>
                  </Tooltip>
                  <Typography variant="body2"> {subscribersCount} subscribers</Typography>
                </div>
              </div>
              <div>
                {!isAuthenticated ?
                  <Button onClick={handleClick} variant="contained" color="secondary" >
                    Subscribe
                  </Button>
                  : isMe ?
                    <Button
                      variant="contained"
                      color="primary"
                      component={NavLink}
                      to={`/profile/${user._id}`}
                    >
                      Customise Channel
                    </Button>
                    : isSubscribed ?
                      <>
                        <Button
                          onClick={handleOpenModal}
                          variant="contained"
                          className={classes.btn}
                        >Subscribed
                        </Button>
                        <IconButton className={classes.iconBtn1}>
                          <NotificationsNoneOutlined />
                        </IconButton>
                      </>
                      :
                      <Button onClick={handleSubscribe} variant="contained" color="secondary">
                        Subscribe
                      </Button>
                }
              </div>

            </Paper>
          </Grid>
          <Grid item xs={6} >
            <Paper variant="outlined" className={classes.wrapper}>
              <div className={classes.commentCount}>
                <Typography variant="subtitle2">Comments</Typography>
                {commentsCount > 0 && <Typography variant="body2">{commentsCount}</Typography>}
              </div>
              <Divider orientation="vertical" flexItem className={commentsCount ? classes.largeDivider : classes.divider} />
              <div className={classes.commentInput}>
                {commentsCount > 0 && firstComment ?
                  <>
                    <Avatar className={classes.small} alt="Remy Sharp" src={firstComment.author.avatar}>
                      {letterAvatar2}
                    </Avatar>
                    <Typography className={classes.firstComment} variant="body2"> {firstComment.text}</Typography>
                  </>
                  :
                  <>
                    {isAuthenticated ?
                      <Avatar className={classes.small} alt="Remy Sharp" src={user.avatar}>
                        {authLetterAvatar}
                      </Avatar>
                      :
                      <Avatar className={classes.small} alt="avatar" >
                      </Avatar>
                    }
                    <Typography
                      className={classes.smallInput}
                      variant="body2"
                    >
                      Add a public comment...
                    </Typography>
                  </>
                }
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>

      {openModal && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent className={classes.content}>
            <DialogContentText className={classes.contentText} variant="body2">
              Unsubscribe from {author.displayName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions >
            <Button className={classes.btn} onClick={handleCloseModal}>
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
        <Typography className={classes.title1}>
          Want to subscribe to this channel?
        </Typography>
        <DialogContent>
          <DialogContentText className={classes.contentText} variant="body2">
            Sign in to subscribe to this channel.
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions classes={{ root: classes.action }}>
          <Button
            component={NavLink}
            to={{ pathname: "/login", state: { from: location.pathname } }}
            color="primary"
          >
            Sign in
          </Button>
        </DialogActions>
      </Popup>

      <Popup open={Boolean(likeAnchorEl)}
        anchorEl={likeAnchorEl}
        handleClose={handleCloseLike}
      >
        <Typography className={classes.title1}>
          Like this video?
        </Typography>
        <DialogContent>
          <DialogContentText className={classes.contentText} variant="body2">
            Sign in to make your opinion count.
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions classes={{ root: classes.action }}>
          <Button
            component={NavLink}
            to={{ pathname: "/login", state: { from: location.pathname } }}
            color="primary"
          >
            Sign in
          </Button>
        </DialogActions>
      </Popup>

      <Popup open={Boolean(dislikeAnchorEl)}
        anchorEl={dislikeAnchorEl}
        handleClose={handleCloseDislike}
      >
        <Typography className={classes.title1}>
          Don't like this video?
        </Typography>
        <DialogContent>
          <DialogContentText className={classes.contentText} variant="body2">
            Sign in to make your opinion count.
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions classes={{ root: classes.action }}>
          <Button
            component={NavLink}
            to={{ pathname: "/login", state: { from: location.pathname } }}
            color="primary"
          >
            Sign in
          </Button>
        </DialogActions>
      </Popup>

      <Popup open={Boolean(saveAnchorEl)}
        anchorEl={saveAnchorEl}
        handleClose={handleCloseSave}
      >
        <Typography className={classes.title1}>
          Want to watch this again later?
        </Typography>
        <DialogContent>
          <DialogContentText className={classes.contentText} variant="body2">
            Sign in to add this video to a playlist.
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions classes={{ root: classes.action }}>
          <Button
            component={NavLink}
            to={{ pathname: "/login", state: { from: location.pathname } }}
            color="primary"
          >
            Sign in
          </Button>
        </DialogActions>
      </Popup>

    </div >
  )
}
