import React from "react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import TopBar from "../components/TopBar";
import useGunContext from "../context/context";

const APP_KEY_PAIR = process.env.APP_KEY_PAIR;

const ChatList = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { getGun } = useGunContext();
  const [users, setUsers] = useState({});

  useEffect(() => {
    getGun()
      .get(`~${APP_KEY_PAIR}`)
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
      <p>{address}</p>
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
