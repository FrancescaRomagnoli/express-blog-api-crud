const express = require("express");
const router = express.Router();
// const postsList = require("../resources/post-list");
const postsController = require("../controllers/postsController");

// # index

router.get("/", postsController.index);

// # show

router.get("/:id", postsController.show);

// # store

router.post("/", postsController.store);

// # update

router.put("/:id", postsController.update);

// # modify

router.patch("/:id", postsController.modify);

// # destroy

router.delete("/:id", postsController.destroy);

// # export

module.exports = router;
