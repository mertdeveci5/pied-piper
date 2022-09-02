// import express from "express";
// import Gun from "gun";
// import cors from "cors";
// import SEA from "gun/sea.js";
const express = require("express");
const Gun = require("gun");
const cors = require("cors");
const SEA = require("gun/sea.js");

// require("bullet-catcher");
require("dotenv").config();

const APP_KEY_PAIR = JSON.parse(process.env.APP_KEY_PAIR);
const APP_TOKEN_SECRET = process.env.APP_TOKEN_SECRET;
const app = express();
const port = process.env.PORT || 7000;
app.use(cors());

app.use(Gun.serve);

app.get("/", (req, res) => {
  res.status(200).send(`Node is alive and working`);
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}️‍🔥`);
});

function verifyToken(msg) {
  if (msg?.headers?.accessToken) {
    try {
      jwt.verify(msg.headers.accessToken, APP_TOKEN_SECRET);

      return true;
    } catch (err) {
      const error = new Error("Invalid access token");

      if (err.name === "TokenExpiredError") {
        // you might want to implement silent refresh here
        error.expiredAt = err.expiredAt;
      }

      return error;
    }
  }

  return false;
}

const gun = Gun({ file: "db/data", web: server, isValid: verifyToken });

gun.on("out", { get: { "#": { "*": "" } } });
// Authorize this app as a user
gun.user().auth(APP_KEY_PAIR, ({ err }) => {
  // TODO handle app auth error
  if (err) {
    console.error(err);
  }
});

app.use(express.json());

app.post("api/certificates", async (req, res) => {
  const { username, pub: userPubKey } = req.body;
  const policy = [
    gun
      .get("~" + app.pub)
      .get("profiles")
      .get(user.pub)
      .put({ name: "mert" }, null, { opt: { cert: certificate } }),
    { "*": "profiles", "+": "*" },
  ];

  const expiresAt = Date.now() + 60 * 60 * 1000 * 2;
  const certificate = await SEA.certify(
    [userPubKey],
    policy,
    APP_KEY_PAIR,
    ({ err }) => {
      if (err) {
        console.log(`Error creating certificate for ${username}:`, err);
      } else {
        console.log(`Successfully created certificate for ${username}`);
      }
    },
    // FIXME neither expiry or block seem to be working?
    // https://github.com/amark/gun/issues/1143
    {
      // expiry: expiresAt,
      // // name of path to blocked/banned users
      // block: 'blocked',
    }
  );

  res.status(201).send({
    certificate,
    expires_at: expiresAt,
  });
});

app.post("/api/tokens", async (req, res) => {
  const { username, pub } = req.body;

  const token = jwt.sign({ username, pub }, APP_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).send({
    accessToken: token,
  });
});
