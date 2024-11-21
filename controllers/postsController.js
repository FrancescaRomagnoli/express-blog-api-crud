const postsList = require("../data/postsList");

// # index

function index(req, res) {
  const responseObj = {
    count: postsList.length,
    posts: postsList,
  };

  res.json(responseObj);
}

// # show
function show(req, res) {
  const postId = parseInt(req.params.id);

  if (postId >= postsList.length || postId < 0) {
    return res.status(404).json({ error: "not found" });
  }

  res.json(postsList[postId]);
}

// # store

function store(req, res) {
  res.send("Create a new post");
}

// # update

function update(req, res) {
  const postId = parseInt(req.params.id);
  res.send(`Update post ${postId}`);
}

// # modify

function modify(req, res) {
  const postId = parseInt(req.params.id);
  res.send(`Modify post ${postId}`);
}

// # destroy

function destroy(req, res) {
  const postId = parseInt(req.params.id);
  res.send(`Deleted post ${postId}`);
}

module.exports = { index, show, store, update, modify, destroy };
