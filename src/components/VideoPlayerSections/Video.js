import React from "react";

import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  ClosedCaptionButton,
  VolumeMenuButton,
} from "video-react";
import "video-react/dist/video-react.css";

function Video() {
  return (
    <Player
      crossOrigin="anonymous"
      src="https://res.cloudinary.com/dwtbzg7gs/video/upload/v1603801840/videos/Shirokane_VN_Fansub_-_%C4%90i%E1%BB%87p_vi%C3%AAn_Tomozou_-_Ch%E1%BB%8B_g%C3%A1i_to%C3%A0n_ch%E1%BB%8Bu_thi%E1%BB%87t_2_i9q5q6.mp4"
    >
      <track
        default
        kind="captions"
        src="https://res.cloudinary.com/dwtbzg7gs/raw/upload/v1603802041/captions/SubtitleTools.com_Chibi_Maruko-chan__2020.10.25_yy56bq.vtt"
        srcLang="ja"
        label="Japanese"
      />
      <track kind="captions" srcLang="en" label="English" />
      <LoadingSpinner />
      <BigPlayButton position="center" />
      <ControlBar autoHide>
        <VolumeMenuButton vertical />
        <ClosedCaptionButton order={7} />
      </ControlBar>
    </Player>
  );
}

export default Video;
