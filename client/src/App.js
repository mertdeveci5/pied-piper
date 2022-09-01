import "./App.css";
import { useEffect, useState, useReducer } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, Link } from "react-router-dom";
// Components
import Sidebar from "./components/Sidebar";
import ChatList from "./pages/ChatList";
import Error from "./pages/Error";
import ChatView from "./components/ChatView";

function App() {
  return (
    <>
      <ChakraProvider>
        <nav style={{ backgroundColor: "red" }}>
          <h1>This is the app</h1>
          <Link to="/">ChatList</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ChatList />}>
            <Route path="/:id" element={<ChatView />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
