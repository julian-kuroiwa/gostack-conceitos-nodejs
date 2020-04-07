const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {url, title, techs} = request.body;

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({error: "ID not found"});
  }

  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    url,
    title,
    techs
  }

  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  //TODO
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({error: "ID not found"});
  }

  const likes = (repositories[repositoryIndex].likes + 1);

  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    likes,
  }

  return response.json({likes});
});

module.exports = app;
