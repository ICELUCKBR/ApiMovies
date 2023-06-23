const { Router } = require("express");

const MoviesController = require("../controllers/MoviesController");
const movieRoutes = Router();

const moviesController = new MoviesController();

movieRoutes.post("/", moviesController.create);
movieRoutes.get("/:id", moviesController.show);
movieRoutes.delete("/:id", moviesController.delete);

module.exports = movieRoutes;
