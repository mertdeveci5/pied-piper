import React from "react";
import { useConnect, useDisconnect, useAccount } from "wagmi";
import { useContext } from "react";
import { userContext } from "../utils/user";
import { InjectedConnector } from "wagmi/connectors/injected";

const ChatHome = () => {
  // const { address } = useAccount();
  const userDetails = useContext(userContext);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  return (
    <>
      {/* <div>Chathome where address is {address ? address : "none"}</div> */}

      {isConnected ?
      <button onClick={disconnect}>Disconnect wallet</button>:
      <button onClick={connect}>Connect</button>}

      <h1>
        Comes from state management:
        {userDetails.email ? userDetails.email : "none"}{" "}
        {address || ""}
      </h1>
    </>
  );
};

export default ChatHome;
