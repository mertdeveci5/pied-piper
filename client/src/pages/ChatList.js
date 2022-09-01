import React from "react";
import ChatCard from "../components/ChatCard";
import { VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const dummyDirectMessages = [
  {
    id: 1,
    name: "mert",
    avatar: "",
  },
  {
    id: 2,
    name: "bertan",
    avatar: "",
  },
  {
    id: 3,
    name: "vivek",
    avatar: "",
  },
  {
    id: 4,
    name: "armand",
    avatar: "",
  },
];

const ChatList = () => {
  return (
    <div
      style={{
        height: "100%",
        minHeight: "60vh",
        overflowY: "scroll",
        position: "relative",
        flex: 25,
        backgroundColor: "grey",
        display: "flex",
        width: "35vw",
      }}
    >
      <VStack spacing={2}>
        {dummyDirectMessages.map((message, index) => {
          return (
            <Link key={index} to="/:id">
              From: {message.name} == {message.id}
            </Link>
          );
        })}
      </VStack>
    </div>
  );
};

export default ChatList;
