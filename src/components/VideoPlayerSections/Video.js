import React from "react";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { upView } from "../../slices/videoSlice";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: "56.25%",
  },
  player: {
    position: "absolute",
    top: 0,
    left: 0,
  },
}));

export default function Video() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { _id, url, subtitle } = useSelector((state) => state.video);

  const handleView = () => {
    dispatch(upView(_id));
  };

  return (
    <div className={classes.wrapper}>
      <ReactPlayer
        className={classes.player}
        url={url}
        width="100%"
        height="100%"
        controls
        loop
        playing
        onStart={handleView}
        config={
          subtitle
            ? {
              file: {
                attributes: {
                  crossOrigin: "true",
                },
                tracks: [
                  {
                    kind: "subtitles",
                    src: subtitle,
                    srcLang: "Japanese",
                    default: true,
                  },
                ],
              },
            }
            : {
              file: {
                attributes: {
                  crossOrigin: "true",
                },
              },
            }
        }
      />
    </div>
  );
}
