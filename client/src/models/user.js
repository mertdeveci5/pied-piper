import Gun from "gun";
import "gun/sea";
import "gun/axe";
import { createContext, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: "yourAlchemyApiKey" }),
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});
export const db = Gun();

export const user = db.user().recall({ sessionStorage: true });

const userContext = createContext(undefined);
const userDispatchContext = createContext(undefined);

function UserProvider({ children }) {
  // web3 logins, we need to persist the wallet address
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const [userDetails, setUserDetails] = useState({
    username: "pied piper - username",
    email: "mock@mock.com",
    walletAddress: address,
    ensAvatar: ensAvatar,
    ensName: ensName,
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
    <WagmiConfig client={client}>
      <userContext.Provider value={userDetails}>
        <userDispatchContext.Provider value={setUserDetails}>
          {children}
        </userDispatchContext.Provider>
      </userContext.Provider>
    </WagmiConfig>
  );
}

export { UserProvider, userContext, userDispatchContext };
