import React from "react";
import { useEffect, useState, useReducer } from "react";

const dummyChannels = [
  {
    id: 1,
    name: "general",
    avatar: "",
  },
  {
    id: 2,
    name: "two",
    avatar: "",
  },
  {
    id: 3,
    name: "three",
    avatar: "",
  },
  {
    id: 4,
    name: "four",
    avatar: "",
  },
];

const Sidebar = () => {
  const [channels, setChannels] = useState(dummyChannels);
  return (
    <>
      <div>
        <h1>Sidebar</h1>
        {channels.map((channel, index) => {
          return <div key={index}>{channel.name}</div>;
        })}
      </div>
    </>
  );
};

export default Sidebar;
