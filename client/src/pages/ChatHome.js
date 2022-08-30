import React from "react";
import { useAccount } from "wagmi";
import { useContext } from "react";
import { userContext } from "../utils/user";

const ChatHome = () => {
  // const { address } = useAccount();
  const userDetails = useContext(userContext);

  return (
    <>
      {/* <div>Chathome where address is {address ? address : "none"}</div> */}
      <h1>
        Comes from state management:
        {userDetails.email ? userDetails.email : "none"}{" "}
      </h1>
    </>
  );
};

export default ChatHome;
