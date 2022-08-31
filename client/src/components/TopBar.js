import React from "react";
import { useConnect, useDisconnect, useAccount } from "wagmi";
import { useContext } from "react";
import { userContext, user, userDispatchContext } from "../utils/user";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ConnectKitButton } from "connectkit";

const TopBar = () => {
  const userDetails = useContext(userContext);
  const setUserDetails = useContext(userDispatchContext);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  let password = "123453453453";

  // @dev | login function
  async function signIn() {
    await connect();
    console.log(`address being used for sign in ${address}`);

    user.auth(address, password, ({ error }) => error && alert(error));
    console.log(`User signed in as ${address}`);
  }

  // @dev | signup function to create the user in gun.js
  function signUp() {
    user.create(address, password, ({ error }) => {
      if (error) {
        alert(error);
      } else {
        signIn();
      }
    });
    console.log(`User signed up as ${address}`);
  }

  // @dev | Signout function that empties the user details and disconnects the user
  function signOut() {
    disconnect();
    user.leave();
    setUserDetails({
      username: "",
      email: "",
      walletAddress: "",
      ensAvatar: "",
      ensName: "",
    });
    console.log(`User signed out as ${address}`);
  }

  return (
    <>
      {isConnected ? (
        <button onClick={signOut}>Disconnect wallet</button>
      ) : (
        <button onClick={signUp}>Connect</button>
      )}
      <h1>
        Comes from state management:
        <ul>
          <li>email: {userDetails.email ? userDetails.email : "none"}</li>
          <li>address: {address || ""}</li>
        </ul>
      </h1>
    </>
  );
};

export default TopBar;
