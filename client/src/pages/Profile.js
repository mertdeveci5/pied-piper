import React, { useContext } from "react";
import { userContext, userDispatchContext } from "../utils/user";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Profile = () => {
  const userDetails = useContext(userContext);
  const setUserDetails = useContext(userDispatchContext);

  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (address)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  return <button onClick={() => connect()}>Connect Wallet</button>;
};

export default Profile;
