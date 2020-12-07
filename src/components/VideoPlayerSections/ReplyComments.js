import React from "react";

import ReplyComment from "./ReplyComment";

export default function ReplyComments({ handleRelpy }) {
  return (
    <div>
      <ReplyComment handleRelpy={handleRelpy} />
      <ReplyComment handleRelpy={handleRelpy} />
      <ReplyComment handleRelpy={handleRelpy} />
      <ReplyComment handleRelpy={handleRelpy} />
    </div>
  );
}
