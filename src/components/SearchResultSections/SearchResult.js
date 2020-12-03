import { Typography } from "@material-ui/core";
import React from "react";

import TopBar from "./TopBar";

export default function SearchResult({ query }) {
  return (
    <>
      <TopBar query={query} />
      <Typography align="center">{query}</Typography>
    </>
  );
}
