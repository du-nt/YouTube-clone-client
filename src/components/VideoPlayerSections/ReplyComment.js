import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

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
}));

function ReplyComment({ handleRelpy }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenReplyForm = () => {
    setAnchorEl(null);
    const user = "Nhu Cut";
    handleRelpy(user);
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar} alt="avatar" src="" />
      <div className={classes.info}>
        <Typography color="textSecondary">Nhu Cut &#8226; 1days ago</Typography>
        <Typography>
          E góp ý với a cover thì tròn vẹn bài ý, cái gì nó có đầu có đuôi, đang
          hay lại hết. Bó tay Giọng hát cover ok e chấm cho
        </Typography>
        <div className={classes.icongroup}>
          <div className={classes.like}>
            <IconButton className={classes.iconButton}>
              <ThumbUpAltIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2"></Typography>
          </div>
          <div className={classes.dislike}>
            <IconButton className={classes.iconButton}>
              <ThumbDownAltIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2">345</Typography>
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
        <MenuItem className={classes.menuItem} onClick={handleOpenReplyForm}>
          Reply
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          Report
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ReplyComment;
