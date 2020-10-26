import React from "react";

import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  ClosedCaptionButton,
} from "video-react";
import "video-react/dist/video-react.css";

function Video() {
  return (
    <div>
      <Player autoPlay src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
        <track
          default
          kind="captions"
          src="/assets/elephantsdream/captions.ja.vtt"
          srcLang="ja"
          label="Japanese"
        />
        <track kind="captions" srcLang="en" label="English" />
        <LoadingSpinner />
        <BigPlayButton position="center" />
        <ControlBar autoHide>
          <ClosedCaptionButton order={7} />
        </ControlBar>
      </Player>
    </div>
  );
}

export default Video;
