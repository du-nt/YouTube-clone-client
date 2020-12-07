import React from "react";

import TopBar from "./TopBar";
import Results from "./Results";

export default function SearchResult({ query }) {
  return (
    <>
      <TopBar query={query} />
      <Results query={query} />
    </>
  );
}
