const express = require("express");
const app = express();
const Gun = require("gun");
const port = 5000;

app.use(Gun.serve);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}🔥`);
});

Gun({ web: server });