import React from "react";
import Gun from "gun";
import { useEffect, useState } from "react";
import Mock from "./components/Mock";
import Login from "./components/Login";
import { Route, Routes } from "react-router";
import Connect from "./components/Connect";
import { useAccount } from "wagmi";

const App = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  return (
    <div>
      <h1 style={{ fontSize: "40px" }}>Chat app</h1>
      <Routes>
        <Route path="/" exact element={<Connect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mock" element={<Mock />} />
      </Routes>
    </div>
  );
};

export default App;
