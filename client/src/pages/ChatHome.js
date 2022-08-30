import React from "react";
import { useConnect } from "wagmi";
import { useContext } from "react";
import { userContext } from "../utils/user";
import { InjectedConnector } from "wagmi/connectors/injected";

const ChatHome = () => {
  // const { address } = useAccount();
  const userDetails = useContext(userContext);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <>
      {/* <div>Chathome where address is {address ? address : "none"}</div> */}
      <button onClick={connect}>Connect</button>

      <h1>
        Comes from state management:
        {userDetails.email ? userDetails.email : "none"}{" "}
        {userDetails.walletAddress || "none"}
      </h1>
    </>
  );
};

export default ChatHome;
