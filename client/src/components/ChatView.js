import React from "react";
import { useParams } from "react-router-dom";

const ChatView = () => {
  const { id } = useParams();
  return (
    <div>
      <p>
        This is the chat view for convo for messages of: <p>{""}</p>
      </p>
    </div>
  );
};

export default ChatView;
