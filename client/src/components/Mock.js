import React from "react";
import Gun from "gun";
import SEA from "gun/sea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

let gun = Gun(["http://localhost:7000/gun"]);
const user = gun.user().recall({ sessionStorage: true });

const Mock = () => {
  const [data, setData] = useState();
  let navigate = useNavigate();
  useEffect(() => {}, []);

  function signOut() {
    user.leave();
    alert(`user signed out`);
    navigate("/");
  }

  return (
    <>
      <div>
        <p>mock data: {data}</p>
        <button onClick={signOut}>Sign out</button>
      </div>
    </>
  );
};

export default Mock;
