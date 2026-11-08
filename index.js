import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Server started");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});
let allPosts = [];

app.post("/submit", (req, res) => {
  const title = req.body["title"];
  const description = req.body["description"];
  console.log("title: ", title);
  console.log("description: ", description);
  allPosts.push({ title: title, description: description });
  res.render("gallery.ejs", {
    posts: allPosts
  });
});

app.get("/blog/:index", (req, res) => {
  const selectedPost = allPosts[req.params.index];
  res.render("blog-details.ejs", {
    postDetails: selectedPost
  });
});

