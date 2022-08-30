import "./App.css";
import { useEffect, useState, useReducer } from "react";
import Gun from "gun";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import { UserProvider } from "./models/user";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <UserProvider>
        <div>mert Deveci</div>
        <Profile />
      </UserProvider>
    </>
  );
}

export default App;
