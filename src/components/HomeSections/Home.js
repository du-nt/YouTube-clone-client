import React from "react";

import { Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import TopBar from "./TopBar";
import VideoItem from "./VideoItem";

export default function Home() {
  return (
    <>
      <TopBar />
      <VideoItem />
      <Link component={NavLink} to="/watch/dfd">
        watch video
      </Link>
    </>
  );
}
