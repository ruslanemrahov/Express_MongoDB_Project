const express = require("express");
const bodyParser = require("body-parser");
const commentsController = require("./controllers/commnets");
const { connect } = require("./db");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome API page");
});

app.get("/comments", commentsController.all);
app.post("/comments", commentsController.create);
app.put("/comments/:id", commentsController.update);
app.delete("/comments/:id", commentsController.delete);

const startServer = async () => {
  await connect("mongodb://localhost:27017/comments");

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}...`);
  });
};

startServer();
