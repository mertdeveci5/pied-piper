import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { GunContextProvider } from "./context/context";

// const alchemyId = process.env.ALCHEMY_SECRET_KEY;
// const client = createClient(
//   getDefaultClient({
//     appName: "Your App Name",
//     alchemyId,
//   })
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <WagmiConfig client={client}> */}
    {/* <ConnectKitProvider> */}
    {/* <BrowserRouter> */}
    <ChakraProvider>
      <GunContextProvider>
        <App />
      </GunContextProvider>
    </ChakraProvider>
    {/* </BrowserRouter> */}
    {/* </ConnectKitProvider> */}
    {/* // </WagmiConfig> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
