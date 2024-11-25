const express = require("express");
const app = express();
const port = 3000;

// # middlewares

const errorsHandler = require("./middlewares/errorsHandler.js");
const notFound = require("./middlewares/notFound.js");

app.use(express.json());
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

// # errors handler
app.use(errorsHandler);
app.use(notFound);

// # listen

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
