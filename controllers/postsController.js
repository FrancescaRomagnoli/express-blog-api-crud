const postsList = require("../data/postsList");

// # index

function index(req, res) {
  const { title, tags } = req.query;

  //   search filter
  let filteredPosts = [...postsList];

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
  const id = parseInt(req.params.id);
  const post = postsList.find((post) => post.id === id);

  // error;
  if (!post) {
    return res.status(404).json({ error: "not found" });
  }

  res.json(post);
}

// # store

function store(req, res) {
  const newId = postsList[postsList.length - 1].id + 1;

  const { title, description, image, tags } = req.body;

  // validation

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a string" });
  }

  if (!description || typeof description !== "string") {
    return res
      .status(400)
      .json({ error: "Description is required and must be a string" });
  }

  if (!image) {
    return res.status(400).json({ error: "Image is required" });
  }

  if (!tags?.length) {
    return res
      .status(400)
      .json({ error: "Tags is required and must be an array" });
  }

  // new post
  const newPost = {
    id: newId,
    title,
    description,
    image,
    tags,
  };

  postsList.push(newPost);

  console.log(newPost);
  res.json(newPost);
}

// # update

function update(req, res) {
  const id = parseInt(req.params.id);
  const postId = postsList.find((post) => post.id === id);
  const postIndex = postsList.indexOf(postId);
  const { title, description, image, tags } = req.body;

  // id error
  if (!postId) {
    return res.status(404).json({ error: "not found" });
  }

  // validation

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a string" });
  }

  if (!description || typeof description !== "string") {
    return res
      .status(400)
      .json({ error: "Description is required and must be a string" });
  }

  if (!image) {
    return res.status(400).json({ error: "Image is required" });
  }

  if (!tags?.length) {
    return res
      .status(400)
      .json({ error: "Tags is required and must be an array" });
  }

  const updatedPost = {
    id,
    title,
    description,
    image,
    tags,
  };

  postsList.splice(postIndex, 1, updatedPost);

  res.json(updatedPost);
}

// # modify

function modify(req, res) {
  const postId = parseInt(req.params.id);
  res.send(`Modify post ${postId}`);
}

// # destroy

function destroy(req, res) {
  const id = parseInt(req.params.id);
  const post = postsList.find((post) => post.id === id);

  // error
  if (!post) {
    return res.status(404).json({ error: "not found" });
  }

  const postId = postsList.indexOf(post);

  postsList.splice(postId, 1);

  res.status(204).json();

  return console.log(postsList);
}

module.exports = { index, show, store, update, modify, destroy };
