import React from "react";
import { useAccount } from "wagmi";

const ChatHome = () => {
  const { address } = useAccount();

  return <div>Chathome where address is {address}</div>;
};

export default ChatHome;
