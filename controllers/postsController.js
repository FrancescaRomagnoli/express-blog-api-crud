const postsList = require("../data/postsList");

// # index

function index(req, res) {
  const responseObj = {
    count: postsList.length,
    posts: postsList,
  };

  const { title, tags } = req.query;

  //   search filter
  let filteredPosts = postsList;

  if (tags) {
    filteredPosts = filteredPosts.filter((post) => post.tags.includes(tags));
  }

  if (title) {
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
    );
  }

  res.json(filteredPosts);
}

// # show
function show(req, res) {
  const postId = parseInt(req.params.id);

  // error
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

  postsList.splice(postId, 1);

  // error
  if (postId >= postsList.length || postId < 0) {
    return res.status(404).json({ error: "not found" });
  }

  res.status(204).json();

  return console.log(postsList);
}

module.exports = { index, show, store, update, modify, destroy };
