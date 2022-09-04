import React, { useReducer } from "react";
import Gun from "gun";
import SEA from "gun/sea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

let gun = Gun(["http://localhost:7000/gun"]);
const user = gun.user().recall({ sessionStorage: true });

const Mock = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  function signOut() {
    user.leave();
    alert(`user signed out`);
    navigate("/");
    localStorage.removeItem("userInfo");
  }

  function sendMessage() {
    user.get("messages").put({ message: "hello world" });
    user.get("messages").put({ message: "second world", to: "user2" });
  }

  function retrieveMessage() {
    user.get("messages").on(function (message) {
      console.log(JSON.stringify(message));
      setMessage(message.message, message.to);
    });
  }

  return (
    <>
      <div>
        <p>mock data: {""}</p>
        <button onClick={signOut}>Sign out</button>
        <button onClick={sendMessage}>Send message</button>
        <button onClick={retrieveMessage}>Retrieve message</button>
        <p>This is the message: {message} + </p>
      </div>
    </>
  );
};

export default Mock;
