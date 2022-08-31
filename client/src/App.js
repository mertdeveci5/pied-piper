import "./App.css";
import { useEffect, useState, useReducer } from "react";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div>
        <h1>The Chat App</h1>
        <Sidebar />
      </div>
    </>
  );
}

export default App;
