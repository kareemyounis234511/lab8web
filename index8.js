const express = require("express");
const app = express();
app.use(express.json());

// -----------------------------
// In-Memory Storage
// -----------------------------
let posts = [];
let comments = [];

// -----------------------------
// POSTS ENDPOINTS
// -----------------------------

// POST create a post
app.post("/posts", (req, res) => {
  if (!req.body.title || !req.body.body) {
    return res.status(400).json({ message: "title and body are required" });
  }

  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    body: req.body.body
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET one post by ID
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  res.json(post);
});

// -----------------------------
// COMMENTS ENDPOINTS
// -----------------------------

// POST comment on a post
app.post("/posts/:id/comments", (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: "text is required" });
  }

  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const newComment = {
    id: comments.length + 1,
    postId: post.id,
    text: req.body.text
  };

  comments.push(newComment);
  res.status(201).json(newComment);
});

// GET all comments for a post
app.get("/posts/:id/comments", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const postComments = comments.filter(c => c.postId == req.params.id);
  res.json(postComments);
});

// -----------------------------
// SERVER START
// -----------------------------
app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
