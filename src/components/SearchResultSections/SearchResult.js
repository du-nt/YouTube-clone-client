import React from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import TopBar from "./TopBar";
import Results from "./Results";

export default function SearchResult({ query }) {
  const matches = useMediaQuery("(min-width:960px)");

  return (
    <>
      {!matches && <TopBar query={query} />}
      <Results />
    </>
  );
}
