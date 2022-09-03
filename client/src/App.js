import React from "react";
import Gun from "gun";
import { useEffect, useState } from "react";
import Mock from "./components/Mock";
import Login from "./components/Login";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <div>
      <h1>Chat app</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mock" element={<Mock />} />
      </Routes>
    </div>
  );
};

export default App;
