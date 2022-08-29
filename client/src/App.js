import "./App.css";
import { useEffect, useState, useReducer } from "react";
import Gun from "gun";
import { faker } from "@faker-js/faker";
import _ from "lodash";

const gun = Gun({ peers: ["http://localhost:5000/gun"] });
const currentState = { messages: [] };

const reducer = (state, message) => {
  return {
    messages: [message, ...state.messages],
  };
};

function App() {
  const [messageText, setMessageText] = useState("");
  const [state, dispatch] = useReducer(reducer, currentState);

  useEffect(() => {
    localStorage.clear();
    const messagesRef = gun.get("MESSAGES");
    messagesRef.map().on((m) => {
      dispatch([
        {
          name: m.name,
          avatar: m.avatar,
          content: m.content,
          timestamp: m.timestamp,
        },
      ]);
    });
  }, []);

  const sendMessage = () => {
    const messagesRef = gun.get("MESSAGES");

    // the message object to be sent/saved
    const messageObject = {
      sender: faker.name.firstName(),
      avatar: faker.image.avatar(),
      content: messageText,
      timestamp: Date().substring(16, 21),
    };

    // this function sends/saves the message onto the network
    messagesRef.set(messageObject);
    console.log(JSON.stringify(messageObject));

    // clear the text field after message has been sent
    // setMessageText("");
  };

  // remove duplicate messages
  // const formattedMessages = state.messages.map(function (messageArray) {
  //   return messageArray.filter((value, index) => {
  //     const _value = JSON.stringify(value);
  //     return (
  //       index ===
  //       state.messages.findIndex((obj) => {
  //         return JSON.stringify(obj) === _value;
  //       })
  //     );
  //   });
  // });

  const formattedMessages = _.uniqBy(state.messages, JSON.stringify);

  return (
    <>
      <div
        className="App"
        style={{ backgroundColor: "blue", height: "min-content" }}
      >
        <h1 style={{ color: "red" }}>mert deveci</h1>
        <main>
          <div className="messages">
            <p style={{ color: "white" }}>
              {JSON.stringify(formattedMessages)}
            </p>
            <ul>
              {state.messages.map(function (messageArray) {
                return messageArray.map((message, index) => {
                  return (
                    <li className="message" key={index}>
                      <img alt="avatar" src={message.avatar} />
                      <div>
                        <p> {message.content}</p>
                        <span>{message.sender}</span>
                      </div>
                    </li>
                  );
                });
              })}
            </ul>
          </div>
          <div className="input-box">
            <input
              placeholder="Type a message..."
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
