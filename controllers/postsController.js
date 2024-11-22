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

  // error
  if (!post) {
    return res.status(404).json({ error: "not found" });
  }

  res.json(post);
}

// # store

function store(req, res) {
  const newId = postsList[postsList.length - 1].id + 1;

  const newPost = {
    id: newId,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    tags: req.body.tags,
  };

  postsList.push(newPost);

  console.log(newPost);
  res.json(newPost);
}

// # update

function update(req, res) {
  const id = parseInt(req.params.id);
  const post = postsList.find((post) => post.id === id);

  // error
  if (!post) {
    return res.status(404).json({ error: "not found" });
  }

  post.title = req.body.title;
  post.description = req.body.description;
  post.image = req.body.image;
  post.tags = req.body.tags;

  res.json(post);
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
