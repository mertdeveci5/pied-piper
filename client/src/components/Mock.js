import React, { useReducer } from "react";
import Gun from "gun";
import SEA from "gun/sea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

let gun = Gun(["http://localhost:7000/gun"]);
const user = gun.user().recall({ sessionStorage: true });

const Mock = () => {
  let navigate = useNavigate();

  function signOut() {
    user.leave();
    alert(`user signed out`);
    navigate("/");
    localStorage.removeItem("userInfo");
  }

  return (
    <>
      <div>
        <p>mock data: {""}</p>
        <button onClick={signOut}>Sign out</button>
      </div>
    </>
  );
};

export default Mock;
