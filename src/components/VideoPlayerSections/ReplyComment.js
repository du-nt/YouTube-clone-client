import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { MentionsInput, Mention } from "react-mentions";
import { useDispatch, useSelector } from "react-redux";

import SignInDialog from "./SignInDialog";

import { deleteReply, addReply } from "../../slices/videoSlice";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  info: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  avatar: {
    backgroundColor: "#00579c",
    marginTop: 4,
    width: theme.spacing(3.3),
    height: theme.spacing(3.3),
    textDecoration: "none",
    fontSize: "0.9rem",
  },
  icongroup: {
    display: "flex",
    margin: theme.spacing(1, 0),
  },
  like: {
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    position: "relative",
    left: -6,
  },
  dislike: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  iconButton: {
    padding: 6,
  },
  more: {
    marginLeft: "auto",
    padding: 6,
    position: "relative",
    right: -6,
  },
  menus: {
    padding: 0,
  },
  menuItem: {
    padding: theme.spacing(0, 3),
    minHeight: theme.spacing(5),
  },
  name: {
    backgroundColor: "#9e9e9e",
    color: "#fff",
    padding: "1px 8px",
    borderRadius: 50,
  },
  mentions: {
    backgroundColor: "#000",
    color: "red",
  },
  input: {
    width: "100%",
    marginTop: 8,
    marginBottom: 4,
    border: 0,
    display: "inline-flex",
    padding: 0,
    position: "relative",
  },
}));

function ReplyComment({ reply }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const [openForm, setOpenForm] = useState(false);
  const [openSignInDialog, setOpenSignInDialog] = useState(false);

  const {
    author,
    text,
    createdAt,
    likesCount,
    dislikesCount,
    commentId,
    responseTo,
  } = reply;
  const time = moment(createdAt).fromNow();
  const letterAvatar = author.displayName.charAt(0).toUpperCase();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [tag, setTag] = useState([]);

  const handleChange = (event, newValue, newPlainTextValue, mentions) => {
    setComment(event.target.value);
    setReplyText(newPlainTextValue);
    setTag(mentions);
  };

  const handleSubmit = () => {
    let content, replyData;
    if (tag.length) {
      content = replyText.replace(tag[0].display, "").trim();
      replyData = { _id: commentId, text: content, responseTo: tag[0].id };
    } else {
      content = replyText.trim();
      replyData = { _id: commentId, text: content };
    }
    dispatch(addReply(replyData));
    setOpenForm(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenReply = () => {
    setAnchorEl(null);
    if (isAuthenticated) {
      user._id !== author._id &&
        setComment(`@[${author.displayName}](${author._id})`);
      setOpenForm(true);
    } else setOpenSignInDialog(true);
  };

  const handleCloseSignInDialog = () => {
    setOpenSignInDialog(false);
  };

  const handleCloseReply = () => {
    setOpenForm(false);
  };

  const handleDeleteReply = () => {
    dispatch(deleteReply(reply));
    setAnchorEl(null);
  };

  return (
    <>
      <div className={classes.root}>
        <Avatar
          component={NavLink}
          to={`/channel/${author.userName}`}
          className={classes.avatar}
          alt="avatar"
          src={author.avatar}
        >
          {letterAvatar}
        </Avatar>
        <div className={classes.info}>
          <Typography color="textSecondary">
            <Typography component="span" className={classes.name}>
              {author.displayName}
            </Typography>
            <Typography component="span"> &#8226; {time}</Typography>
          </Typography>
          <Typography>
            {responseTo && (
              <Link
                underline="none"
                component={NavLink}
                to={`/channel/${responseTo.userName}`}
              >
                @{responseTo.displayName}
              </Link>
            )}
            {responseTo && <Typography component="span">&nbsp;</Typography>}
            <Typography component="span">{text}</Typography>
          </Typography>
          <div className={classes.icongroup}>
            <div className={classes.like}>
              <IconButton className={classes.iconButton}>
                <ThumbUpAltIcon fontSize="small" />
              </IconButton>
              {likesCount > 0 && (
                <Typography variant="body2">{likesCount}</Typography>
              )}
            </div>
            <div className={classes.dislike}>
              <IconButton className={classes.iconButton}>
                <ThumbDownAltIcon fontSize="small" />
              </IconButton>
              {dislikesCount > 0 && (
                <Typography variant="body2">{dislikesCount}</Typography>
              )}
            </div>
            <IconButton className={classes.more} onClick={handleMenu}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
          classes={{ list: classes.menus }}
        >
          <MenuItem className={classes.menuItem} onClick={handleOpenReply}>
            Reply
          </MenuItem>
          {user?._id === author._id && (
            <MenuItem className={classes.menuItem} onClick={handleDeleteReply}>
              Delete
            </MenuItem>
          )}
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            Report
          </MenuItem>
        </Menu>
      </div>

      {openForm && (
        <Dialog
          open={openForm}
          onClose={handleCloseReply}
          onEnter={() => inputRef.current.focus()}
        >
          <DialogContent>
            <MentionsInput
              singleLine
              value={comment}
              onChange={handleChange}
              inputRef={inputRef}
              //   className={classes.input}
            >
              <Mention
                markup="@[__display__](__id__)"
                data={[]}
                appendSpaceOnAdd={true}
                displayTransform={(id, display) => `@${display} `}
                // className={classes.mentions}
              />
            </MentionsInput>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReply}>Cancel</Button>
            <Button onClick={handleSubmit} color="primary">
              Reply
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {openSignInDialog && (
        <SignInDialog
          openSignInDialog={openSignInDialog}
          handleCloseSignInDialog={handleCloseSignInDialog}
          title="Want to act on this comment?"
          content="Please sign in to do it."
        />
      )}
    </>
  );
}

export default ReplyComment;
