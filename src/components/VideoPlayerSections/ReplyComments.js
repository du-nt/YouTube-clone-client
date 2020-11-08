import React from "react";

import ReplyComment from "./ReplyComment";
import AddReplyComment from "./AddReplyComment";

export default function ReplyComments({ showReplyForm }) {
  return (
    <div>
      {showReplyForm && <AddReplyComment />}
      <ReplyComment />
      <ReplyComment />
    </div>
  );
}
