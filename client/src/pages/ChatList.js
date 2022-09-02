import React from "react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import TopBar from "../components/TopBar";
import useGunContext from "../context/context";

const APP_PUBLIC_KEY = process.env.APP_PUBLIC_KEY;

const ChatList = () => {
  // const { address, isConnecting, isDisconnected } = useAccount();
  const [users, setUsers] = useState({});
  const { getGun } = useGunContext();

  //
  //
  useEffect(() => {
    getGun()
      .get(`~${APP_PUBLIC_KEY}`)
      .get("profiles")
      .map()
      .on((profile, pub) => {
        setUsers((users) => ({
          ...users,
          [pub]: profile,
        }));
      });
  }, []);

  return (
    <>
      <TopBar />
      <p>{"address"}</p>
      <div>
        <ul>
          {Object.entries(users).map(([pub, user]) => (
            <li key={pub}>Username: ({user.username})</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChatList;
