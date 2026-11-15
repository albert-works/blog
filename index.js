import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Server started");
});

app.get("/", (req, res) => {
  res.render("home.ejs", { currentPage: "home", pageStyle: "home.css" });
});
let allPosts = [];

app.post("/submit", (req, res) => {
  const title = req.body["title"];
  const description = req.body["description"];
  // console.log("title: ", title);
  // console.log("description: ", description);
  allPosts.push({ title: title, description: description });
  res.render("gallery.ejs", {
    posts: allPosts
  });
});

app.get("/blog/:index", (req, res) => {
  const selectedPost = allPosts[req.params.index];
  res.render("blog-details.ejs", {
    postDetails: selectedPost,
    currentPage: "blog-details",
  });
});

app.get("/gallery", (req, res) => {
  res.render("gallery.ejs", { posts: allPosts, pageStyle: "/styles/gallery.css"});
});

app.get("/blog/:index/edit", (req, res) => {
  const selectedPost = allPosts[req.params.index];
  // console.log("selectedPost: ", selectedPost);
  res.render("blog-edit.ejs", {
      postDetails: { 
        selectedPost,
        index: req.params.index
      },
      currentPage: "blog-edit",
  });
});

app.post("/blog/:index/update", (req, res) => {
  const index = req.params.index;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  
  // Update the post in the allPosts array
  allPosts[index] = { title: updatedTitle, description: updatedDescription };
  res.redirect("/gallery");
});

app.post("/blog/:index/delete", (req, res) => {
  const index = req.params.index;
  // Remove the post from the allPosts array
  allPosts.splice(index, 1);
  res.redirect("/gallery");
});
