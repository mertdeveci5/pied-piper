import express from "express";
import Gun from "gun";
import cors from "cors";

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

Gun({ web: server });
