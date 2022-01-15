import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { useSelector } from "react-redux";

import TopBar from "../HomeSections/TopBar";
import NotLog from "./NotLog";
import Log from "./Log";
import Trending from '../Others/Trending'
import NotLogDesktop from "./NotLogDesktop";

export default function Library() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const matches = useMediaQuery('(min-width:960px)')

  return (
    <>
      {!matches && <TopBar />}
      {matches ?
        isAuthenticated ? <Trending /> : <NotLogDesktop />
        :
        isAuthenticated ? <Log /> : <NotLog />}
    </>
  );
}
