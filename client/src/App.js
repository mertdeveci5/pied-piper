import "./App.css";
import { useEffect, useState, useReducer } from "react";
import Gun from "gun";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import { UserProvider } from "./utils/user";
import Profile from "./pages/Profile";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import ChatHome from "./pages/ChatHome";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function App() {
  return (
    <WagmiConfig client={client}>
      <UserProvider>
        <h1>The Chat App</h1>
        <ChatHome />
      </UserProvider>
    </WagmiConfig>
  );
}

export default App;
