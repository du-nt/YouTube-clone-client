import React from "react";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

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
  const { url, subtitle } = useSelector((state) => state.video);

  const handleView = () => {
    console.log("object");
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
        config={{
          file: {
            tracks: [
              {
                kind: "subtitles",
                src: subtitle,
                srcLang: "Japanese",
                default: true,
              },
            ],
          },
        }}
      />
    </div>
  );
}
