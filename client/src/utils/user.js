import Gun from "gun";
import "gun/sea";
import "gun/axe";
import { useAccount } from "wagmi";
import { createContext, useState } from "react";

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
  });

  user.get("identity").on((e) => {
    setUserDetails(e);
  });

  db.on("auth", async (event) => {
    const identity = await user.get("identity");
    setUserDetails(identity);
    console.log(`Signed in as: ${identity.username}`);
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
