import React from "react";
import { useEffect, useState, useReducer } from "react";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
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
      <div
        style={{
          height: "50vh",
          width: "100vw",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            height: "50vh",
            backgroundColor: "red",
            overflowY: "scroll",
            position: "relative",
            flex: 3,
            paddingTop: 10,
          }}
        >
          <h1>Sidebar</h1>
          <VStack style={{ backgroundColor: "green" }} spacing={2}>
            {channels.map((channel, index) => {
              return (
                <Avatar
                  key={index}
                  name={channel.name}
                  src={channel.avatar}
                ></Avatar>
              );
            })}
          </VStack>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
