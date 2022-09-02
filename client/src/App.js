import "./App.css";
import { useEffect, useState, useReducer } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useAccount } from "wagmi";

// Components
import Home from "./pages/Home";
import ChatList from "./pages/ChatList";
import useGunContext from "./context/context";

function App() {
  const { getGun, getUser, setCertificate, onAuth } = useGunContext();
  // const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {}, []);

  return (
    <>
      <div style={{ backgroundColor: "grey" }}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/chats" exact element={<ChatList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
