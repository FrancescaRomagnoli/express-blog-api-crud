const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// # static assets

app.use(express.static("public"));

// # routers
const postsRouter = require("./routers/posts");

app.use("/posts", postsRouter);

// # routes

app.get("/", (req, res) => {
  const text = "Server del mio blog";
  res.send(text);
});

app.get("/bacheca", (req, res) => {
  res.send("dashboard");
});

// # listen

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
