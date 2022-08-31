import Gun from "gun/gun";
import "gun/sea";
import "gun/axe";
import { useAccount } from "wagmi";
import { createContext, useState, useEffect } from "react";

export const db = Gun();

export const user = db.user().recall({ sessionStorage: true });

const userContext = createContext(undefined);
const userDispatchContext = createContext(undefined);

function UserProvider({ children }) {
  // web3 logins, we need to persist the wallet address
  const { address } = useAccount();

  const [userDetails, setUserDetails] = useState({
    username: "pied piper - username",
    email: "mock@mock.com",
    walletAddress: address,
    ensAvatar: "img",
    ensName: "ensName",
    avatar: "",
  });

  user.get("alias").on((e) => {
    setUserDetails({ ...userDetails, username: e });
    console.log(`this comes from gunjs: ${e}`);
  });

  db.on("auth", async (event) => {
    const alias = await user.get("alias");
    setUserDetails(alias);
    console.log(`Signed in as: ${alias}`);
  });

  return (
    <userContext.Provider value={userDetails}>
      <userDispatchContext.Provider value={setUserDetails}>
        {children}
      </userDispatchContext.Provider>
    </userContext.Provider>
  );
}

export { UserProvider, userContext, userDispatchContext };
