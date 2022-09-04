import React, { useEffect } from "react";
import Gun from "gun";
import SEA from "gun/sea";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

let gun = Gun(["http://localhost:7000/gun"]);
const user = gun.user().recall({ sessionStorage: true });

const Connect = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  function createUser() {
    user.create(address, address, (ack) => {
      alert(`from create now creating user: ${JSON.stringify(ack)}`);
      if (ack.err) {
        alert(`Error on create ${ack.err}`);
      } else {
        alert(`Email and password ${address} + ${address}`);
        user.auth(address, address, ({ err, soul }) => {
          alert(`from auth, this is the soul of user: ${JSON.stringify(soul)}`);
          if (err) {
            alert(`Error while authenticating the new user: ${err}`);
          } else {
            user.on("auth", (ack) => {
              alert(`Login successful: ${JSON.stringify(ack)}`);
              console.log(`Login successful: ${JSON.stringify(ack)}`);
              const { alias } = ack;
              console.log(`This is the alias of the user: ${alias}`);
              localStorage.setItem("userInfo", JSON.stringify(alias));
            });
          }
        });
      }
    });
  }
  useEffect(() => {
    if (isConnected && address) {
      alert(`WAGMI: User is connected with ${address}`);
      user.auth(address, address, ({ err, soul }) => {
        alert(
          `Auth first and this is the soul: ${JSON.stringify(
            soul
          )} and error: ${err}`
        );
        if (err) {
          alert(`There was an error in authentication: ${err}`);
          createUser();
        } else {
          user.on(
            ("auth",
            (ack) => {
              alert(`Login successful: ${JSON.stringify(ack)}`);
              console.log(`Login successful: ${JSON.stringify(ack)}`);
              const { alias } = ack;
              console.log(`This is the alias of the user: ${alias}`);
              localStorage.setItem("userInfo", JSON.stringify(alias));
            })
          );
        }
      });
    }

    if (isDisconnected && !address) {
      console.log(`WAGMI: User is disconnected`);
      localStorage.removeItem("userInfo");
    }
  }, [isConnected, address, isDisconnected]);

  return (
    <>
      <ConnectKitButton />
      <h1>man {JSON.stringify(user)}</h1>
    </>
  );
};

export default Connect;
