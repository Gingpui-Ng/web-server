import express from "express";
import pagesRouter from "./routes/pages.js";
import apiRouter from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3000;

// EJS settings
app.set("view engine", "ejs");
app.set('views', 'views');

// Routers
app.use("/", pagesRouter);
app.use("/api", apiRouter);

const projects = [
  { name: "Weather app", tag: "javascript" },
  { name: "Portfolio site", tag: "express" },
  { name: "Budget tracker", tag: "python" },
];

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/", (req, res) => {
  res.send("Hello, web! This is my greeting!");
});

app.get("/hello", (req, res) => {
  res.send("I learned how to build my simple server.");
});

app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get("/repeat/:word", (req, res) => {
  const word = req.params.word;
  res.send(`${word} ${word} ${word}`);
});

app.get("/users/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.send(`User ${userId}, post ${postId}`);
});

app.get("/search", (req, res) => {
  const term = req.query.term || "nothing";
  const limit = parseInt(req.query.limit) || 5;
  res.send(`Searching for "${term}", showing ${limit} results.`);
});

app.get("/count", (req, res) => {
  const from = req.query.from || "1";
  const to = req.query.to || "10";
  res.send(`Counting from ${from} to ${to}.`);
});

app.get("/projects", (req, res) => {
  const tag = req.query.tag;
  // filter `projects` here, based on your decision above
  if (tag === undefined) {
    res.json({ error: "tag is missing" });
    return;
  }

  const matchingProjects = projects.filter((element) => tag === element.tag);

  if (matchingProjects.length === 0) {
    res.json({ error: `tag ${tag} not found` });
    return;
  }

  res.json(matchingProjects);
});

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
